const bunyan = require('bunyan');

module.exports = function(config) {
    return bunyan.createLogger({
        name: config.log.name,
        level: config.log.level,
        streams: config.log.streams
    });
};
