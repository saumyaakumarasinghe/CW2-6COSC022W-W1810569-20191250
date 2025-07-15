const express = require('express');
const commentController = require('../../controllers/comment.controller');
const commentRouter = express.Router();

const { checkAuth } = require('../../middleware/token.middleware');

commentRouter.post('/', checkAuth, commentController.createComment);

commentRouter.get('/:postId', commentController.getAllComments);

commentRouter.delete('/:postId', checkAuth, commentController.deleteComment);

module.exports = commentRouter;
