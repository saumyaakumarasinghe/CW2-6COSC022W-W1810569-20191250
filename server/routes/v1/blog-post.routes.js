const express = require('express');
const blogPostController = require('../../controllers/blog-post.controller');
const blogPosRoutes = express.Router();

blogPosRoutes.post('/', blogPostController.createBlogPost);

blogPosRoutes.get('/', blogPostController.getAllBlogPosts);

blogPosRoutes.get('/:id', blogPostController.getSingleBlogPost);

blogPosRoutes.put('/:id', blogPostController.updateBlogPost);

blogPosRoutes.delete('/:id', blogPostController.deleteBlogPost);

module.exports = blogPosRoutes;
