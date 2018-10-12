const glob = require('./lib/glob');
const Sequelize = require('sequelize');
const path = require('path');
const jwt = require('./lib/strategies/jwt');

function asyncMiddleware(fn, db, config, log) {
    return (req, res) => {
        Promise.resolve(async function(req, res) {
            let data = await fn(req.params, db, config, log);
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
            func.call(app, item.route, asyncMiddleware(item.controller, db, config, log));
        } else if (config.authenticate && config.authenticate.enable) {
            func.call(app, item.route, jwt.checkAuthenticate, asyncMiddleware(item.controller, db, config, log));
        }
    });
}

function initDatabase(config, log) {
    let { dialect, database, user, password, host, port } = config.database;
    const sequelize = new Sequelize(database, user, password, {
        host: host,
        port: port,
        dialect: dialect
        // pool: {
        //     max: 5,
        //     min: 0,
        //     acquire: 30000,
        //     idle: 10000
        // }
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
    let db;
    if (config.database) {
        db = initDatabase(config, log);

        // init models
        if (config.model) {
            require(path.normalize(path.join(config.model, 'index.js'))).init(db);
        }

        if (config.authenticate && config.authenticate.enable) {
            require('./lib/strategies/user').init(db);
            require('./lib/strategies/jwt').jwtStrategy(db, config.authenticate);
        }
    }

    // get all routers
    if (config.route) {
        glob.getGlobbedFiles(path.normalize(path.join(config.route, '**', '*.js'))).forEach(routePath => initRoute(app, db, config, require(routePath), log));
    }

    if (db) {
        // run db sync
        await db.sync();
    }

    return { db };
}
