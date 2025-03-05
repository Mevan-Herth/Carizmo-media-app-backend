const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const env = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
};

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET','COOKIE_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

module.exports = env;