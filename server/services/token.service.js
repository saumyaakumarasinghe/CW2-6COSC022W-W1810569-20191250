const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const generateToken = async (payload) => {
  try {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: '24h' });
  } catch (err) {
    console.error('Error generating access token:', err.message);
    throw new Error('Failed to generate access token');
  }
};

const authenticateToken = async (token) => {
  try {
    return jwt.verify(token, TOKEN_SECRET);
  } catch (err) {
    console.error('Access token verification failed:', err.message);
    return null;
  }
};

module.exports = {
  generateToken,
  authenticateToken,
};
