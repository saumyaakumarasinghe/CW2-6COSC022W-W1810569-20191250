const express = require('express');
const router = express.Router();
const likeController = require('../../controllers/like.controller');

const { checkAuth } = require('../../middleware/check-token.middleware');

// Toggle like/unlike for a post
router.post('/:postId/like', checkAuth, likeController.toggleLike);

// Get likes for a specific post
router.get('/:postId/likes', likeController.getPostLikes);

module.exports = router;
