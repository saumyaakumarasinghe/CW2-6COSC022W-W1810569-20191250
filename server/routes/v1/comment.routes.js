const express = require('express');
const commentController = require('../../controllers/comment.controller');
const commentRoutes = express.Router();

const { checkAuth } = require('../../middleware/check-token.middleware');

commentRoutes.post('/', checkAuth, commentController.createComment);

commentRoutes.get('/:postId', commentController.getAllComments);

commentRoutes.delete('/:postId', checkAuth, commentController.deleteComment);

module.exports = commentRoutes;
