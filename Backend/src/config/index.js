const connectDB = require('./db');
const env = require('./env');
const serverConfig = require('./server');


module.exports = {
    connectDB,
    env,
    serverConfig,
};