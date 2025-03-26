const env = require('./env');

module.exports = {
  port: env.PORT,
  corsOptions: {
    origin: 'http://localhost:3001', // Allow all origins (update this for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
};