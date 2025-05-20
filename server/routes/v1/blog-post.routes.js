const express = require('express');
const blogPostController = require('../../controllers/blog-post.controller');
const blogPosRoutes = express.Router();

const { checkAuth } = require('../../middleware/check-token.middleware');

blogPosRoutes.post('/', checkAuth, blogPostController.createBlogPost);

blogPosRoutes.get('/', blogPostController.getAllBlogPosts);

blogPosRoutes.get('/:id', blogPostController.getSingleBlogPost);

blogPosRoutes.put('/:id', checkAuth, blogPostController.updateBlogPost);

blogPosRoutes.delete('/:id', checkAuth, blogPostController.deleteBlogPost);

module.exports = blogPosRoutes;
