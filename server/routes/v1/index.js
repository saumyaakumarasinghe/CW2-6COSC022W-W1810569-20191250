const express = require('express');
const routesV1 = express.Router();
const { checkAuth } = require('../../middleware/token.middleware');

const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const countryRouter = require('./country.routes');
const blogPostRouter = require('./blog-post.routes');
const commentRouter = require('./comment.routes');
const likeRouter = require('./like.routes');
const followRouter = require('./follow.routes');

routesV1.use('/oauth', authRouter);
routesV1.use('/user', checkAuth, userRouter);
routesV1.use('/country', checkAuth, countryRouter);
routesV1.use('/blog-post', blogPostRouter);
routesV1.use('/comment', commentRouter);
routesV1.use('/like', likeRouter);
routesV1.use('/follow', checkAuth, followRouter);

module.exports = routesV1;
