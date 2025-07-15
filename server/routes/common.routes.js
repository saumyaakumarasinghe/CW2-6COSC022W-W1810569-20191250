const express = require('express');
const commonRouter = express.Router();

commonRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

module.exports = commonRouter;
