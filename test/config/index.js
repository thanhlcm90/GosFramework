const path = require('path');

module.exports = {
    app: {
        name: 'test',
        version: '1.0.0'
    },

    route: path.normalize(`${__dirname}/../src/routes`),
    model: path.normalize(`${__dirname}/../src/models`),

    http: require('./http'),
    log: require('./log'),
    database: require('./database'),
    authenticate: require('./authenticate')
}
