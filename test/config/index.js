module.exports = {
    app: {
        name: 'test',
        version: '1.0.0'
    },

    route: 'src/routes',
    model: 'src/models',

    http: require('./http'),
    log: require('./log'),
    database: require('./database')
}
