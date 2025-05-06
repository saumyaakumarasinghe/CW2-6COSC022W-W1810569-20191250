const express = require('express');
const commonRoutes = express.Router();

commonRoutes.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

module.exports = commonRoutes;
