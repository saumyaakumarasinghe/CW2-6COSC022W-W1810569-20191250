const express = require('express');
const routesV1 = express.Router();
const { checkAuth } = require('../../middleware/check-token.middleware');

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const countryRoutes = require('./country.routes');

routesV1.use('/oauth', authRoutes);
routesV1.use('/user', checkAuth, userRoutes);
routesV1.use('/country', checkAuth, countryRoutes);

module.exports = routesV1;
