const GosApiFramework = require('..').Framework;
const config = require('./config');
let server = new GosApiFramework(config);
server.run();
