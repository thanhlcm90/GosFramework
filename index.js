const fs = require('fs');
const restify = require('restify');
const os = require('os');

class GosApiFramework {

    constructor(config, log) {
        this.config = config;
        this.log = log || console;
    }

    /**
     * Bootstrap the server with the config
     */
    async run() {
        const config = this.config;
        const http_options = {
            app: config.app.name,
            version: config.app.version
        };

        // config for ssl
        if (config.ssl) {
            http_options.key = fs.readFileSync(config.certs.key);
            http_options.certificate = fs.readFileSync(config.certs.certificate);
        }

        // create http server base on above options
        const app = restify.createServer(http_options);

        // catch the EADDRINUSE error
        app.on('error', function(err) {
            if (err.errno === 'EADDRINUSE') {
                this.log.error('Port already in use.');
                process.exit(1);
            } else {
                this.log.log(err);
            }
        });

        require('./restify')(app, config, this.log);

        await require('./bootstrap')(app, config, this.log);

        return new Promise(resolve => {
            app.listen(config.http.port, function() {
                console.log(`App started on ${config.http.host}:${config.http.port} with ssl=${config.http.ssl}`);
                console.log('OS: ' + os.platform() + ', ' + os.release());
                resolve();
            });
        });
    }
}

module.exports = GosApiFramework;
module.exports.ApiValidator = require('./lib/api-validator');
module.exports.User = require('./lib/strategies/user');
module.exports.JWT = require('./lib/strategies/jwt');
