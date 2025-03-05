const jwt = require('jsonwebtoken');
const env = require('../../config/env'); 

function generateToken(userId) {
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
}

function verifyToken(token) {
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
