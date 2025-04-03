const { verifyToken } = require('../../infrastructure/services/authService');

const authMiddleware = (req, res, next) => {
    const token = req.signedCookies['jwt'];
    console.log(req.cookies)
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId; // Attach user ID to the request object
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message); // Log for debugging purposes

    // Check if the error is due to token expiration
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired.',
      });
    }

    // Handle other JWT errors (invalid token)
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.',
      });
    }

    // Generic error handler
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

module.exports = { authMiddleware };
