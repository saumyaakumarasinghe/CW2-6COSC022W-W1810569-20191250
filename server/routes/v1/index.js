const express = require('express');
const routesV1 = express.Router();

const authRoutes = require('./auth.routes');

routesV1.use('/oauth', authRoutes);

module.exports = routesV1;
