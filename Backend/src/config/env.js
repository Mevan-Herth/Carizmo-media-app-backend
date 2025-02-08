const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const env = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex'),
//   NODE_ENV: process.env.NODE_ENV || 'development',
//   EMAIL_USER: process.env.EMAIL_USER,
//   EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
//   FRONTEND_URL: process.env.FRONTEND_URL,
};

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

module.exports = env;