const express = require('express');
const likeController = require('../../controllers/like.controller');
const likeRoutes = express.Router();

const { checkAuth } = require('../../middleware/check-token.middleware');

likeRoutes.get('/:postId', likeController.getPostLikes);

likeRoutes.get('/:postId/like', checkAuth, likeController.toggleLike);

likeRoutes.get('/:postId/dislike', checkAuth, likeController.toggleDislike);

module.exports = likeRoutes;
