const express = require('express');
const blogPostController = require('../../controllers/blog-post.controller');
const blogPosRouter = express.Router();

const { checkAuth } = require('../../middleware/token.middleware');

blogPosRouter.post('/', checkAuth, blogPostController.createBlogPost);

blogPosRouter.get('/', blogPostController.getAllBlogPosts);

blogPosRouter.get('/user', checkAuth, blogPostController.getAllBlogPostsByUserId);

blogPosRouter.get('/user/:userId', checkAuth, blogPostController.getFeedByUserId);

blogPosRouter.get('/:id', blogPostController.getSingleBlogPost);

blogPosRouter.put('/:id', checkAuth, blogPostController.updateBlogPost);

blogPosRouter.delete('/:id', checkAuth, blogPostController.deleteBlogPost);

module.exports = blogPosRouter;
