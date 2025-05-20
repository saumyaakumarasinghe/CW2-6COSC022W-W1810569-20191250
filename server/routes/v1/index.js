const express = require('express');
const routesV1 = express.Router();
const { checkAuth } = require('../../middleware/check-token.middleware');

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const countryRoutes = require('./country.routes');
const blogPostRoutes = require('./blog-post.routes');
const commentRoutes = require('./comment.routes');
const likeRoutes = require('./like.routes');

routesV1.use('/oauth', authRoutes);
routesV1.use('/user', checkAuth, userRoutes);
routesV1.use('/country', checkAuth, countryRoutes);
routesV1.use('/blog-post', blogPostRoutes);
routesV1.use('/comment', commentRoutes);
routesV1.use('/like', likeRoutes);

module.exports = routesV1;
