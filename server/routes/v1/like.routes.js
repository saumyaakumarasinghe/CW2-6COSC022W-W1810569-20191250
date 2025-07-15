const express = require('express');
const likeRouter = express.Router();
const likeController = require('../../controllers/like.controller');

const { checkAuth } = require('../../middleware/token.middleware');

// Toggle like/unlike for a post
likeRouter.post('/:postId', checkAuth, likeController.toggleLike);

// Get likes for a specific post
likeRouter.get('/:postId', checkAuth, likeController.getPostLikes);

likeRouter.get('/public/:postId', likeController.getPostLikes);

module.exports = likeRouter;
