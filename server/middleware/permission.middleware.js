const { STATUS_CODES } = require('../constants/status-code.constants');
const { ERROR_MESSAGES } = require('../constants/error.constants');

const checkPermissions = (allowedRoles) => {
  return (req, res, next) => {
    try {
      console.log('Checking permissions...', req.user?.role, req.user);

      const userRole = req.user?.role;
      if (!userRole) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({ error: ERROR_MESSAGES.UNAUTHORIZED });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(STATUS_CODES.FORBIDDEN).json({ error: ERROR_MESSAGES.FORBIDDEN });
      }

      next(); // User is authorized, proceed to the next middleware or route handler
    } catch (err) {
      console.error('Permission check error:', err.message);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  };
};

module.exports = checkPermissions;
