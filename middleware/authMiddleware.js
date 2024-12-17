const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Assuming you have a User model

// Middleware to check if the user is authenticated
const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: 'Authorization token is missing',
        error: 'Unauthorized',
      });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request object
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: 'User not found',
        error: 'Unauthorized',
      });
    }

    req.user = user;  // Add the user to the request object for use in the routes
    next();  // Call the next middleware or route handler
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid or expired token',
      error: 'Unauthorized',
    });
  }
};




module.exports = authMiddleware;
