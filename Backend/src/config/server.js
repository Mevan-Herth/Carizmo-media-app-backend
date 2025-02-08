const env = require('./env');

module.exports = {
  port: env.PORT,
  corsOptions: {
    origin: '*', // Allow all origins (update this for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
};