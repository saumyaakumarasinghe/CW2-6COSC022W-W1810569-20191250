const { STATUS_CODES } = require('../constants/status-code.constants');
const { authenticateToken } = require('../utils/token.util');

const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: 'Access Denied, invalid token format' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = await authenticateToken(token);
    if (!decoded) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded;
    console.log('User authenticated:', req.user);

    next();
  } catch (err) {
    console.error('Error in checkAuth middleware:', err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

module.exports = { checkAuth };
