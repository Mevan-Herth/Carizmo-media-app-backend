const connectDB = require('../infrastructure/mongdb/connection');
const env = require('./env');
const serverConfig = require('./server');


module.exports = {
    connectDB,
    env,
    serverConfig,
};