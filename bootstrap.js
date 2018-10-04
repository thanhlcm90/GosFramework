const glob = require('./lib/glob');
const Sequelize = require('sequelize');
const path = require('path');

function asyncMiddleware(fn, db, log) {
    return (req, res) => {
        Promise.resolve(async function(req, res) {
            let data = await fn(req.params, db);
            if (data) {
                res.send(200, data);
            } else {
                res.send(200);
            }
        }(req, res)).catch(function(error) {
            if (typeof error === 'object') {
                console.error(error);
                log.error(error);
            }
            return res.send(400, {
                message: error.toString()
            });
        });
    };
}

function initRoute(app, db, config, items, log) {
    items.forEach(item => {
        let func = app[item.method];
        if (!item.auth) {
            func.call(app, item.route, asyncMiddleware(item.controller, db, log));
        } else if (config.auth) {
            func.call(app, item.route, config.auth, asyncMiddleware(item.controller, db, log));
        }
    });
}

function initDatabase(config, log) {
    let { dialect, database, user, password, host } = config.database;
    const sequelize = new Sequelize(database, user, password, {
        host: host,
        dialect: dialect,
        operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
    sequelize
        .authenticate()
        .then(() => {
            log.info('Connection has been established successfully.');
        })
        .catch(err => {
            log.error('Unable to connect to the database:', err);
        });

    return sequelize;
}

module.exports = async function(app, config, log) {
    // init database
    const db = initDatabase(config, log);

    // init models
    require(path.normalize(path.join(config.model, 'index.js'))).init(db);

    // get all routers
    glob.getGlobbedFiles(path.normalize(path.join(config.route, '**', '*.js'))).forEach(routePath => initRoute(app, db, config, require(routePath), log));

    // run db sync
    await db.sync();
}
