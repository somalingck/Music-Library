// Middleware to check the user's role
const roleMiddleware = (roles) => {
    return (req, res, next) => {
      // Check if the user object is available (should be set by authMiddleware)
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({
          status: 403,
          message: 'Forbidden: You do not have the required permissions',
          error: 'Forbidden',
        });
      }
  
      next(); // Proceed to the next middleware or route handler
    };
  };
  
  module.exports = roleMiddleware;
  