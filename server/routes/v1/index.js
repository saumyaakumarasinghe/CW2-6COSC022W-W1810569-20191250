const express = require('express');
const routesV1 = express.Router();
const { checkAuth } = require('../../middleware/check-token.middleware');

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const countryRoutes = require('./country.routes');
const blogPostRoutes = require('./blog-post.routes');

routesV1.use('/oauth', authRoutes);
routesV1.use('/user', checkAuth, userRoutes);
routesV1.use('/country', checkAuth, countryRoutes);
routesV1.use('/blog-post', blogPostRoutes);

module.exports = routesV1;
