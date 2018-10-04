const GosApiFramework = require('..');
const config = require('./config');
let server = new GosApiFramework(config);
server.run().then(() => console.log('Server init finish'));
