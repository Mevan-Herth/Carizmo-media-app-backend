const jwt = require('jsonwebtoken');
const env = require('../config/env');

function generateToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, env.JWT_SECRET, {
    expiresIn: '1h'
  });
}

module.exports = {
  generateToken
};
