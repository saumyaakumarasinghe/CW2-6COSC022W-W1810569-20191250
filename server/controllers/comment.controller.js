const commentService = require('../services/comment.database.service');
const { STATUS_CODES } = require('../constants/status-code.constants');
const { ERROR_MESSAGES } = require('../constants/error.constants');

const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const { userId } = req.user;

    if (!userId || !postId || !content) {
      return res.status(STATUS_CODES.FORBIDDEN).json(ERROR_MESSAGES.INVALID_REQUEST_BODY);
    }

    const createdComment = await commentService.createComment({
      userId,
      postId,
      content,
    });

    res.status(STATUS_CODES.CREATED).json(createdComment);
  } catch (err) {
    console.error('Error creating comment:', err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(STATUS_CODES.FORBIDDEN).json({ error: 'Post ID is required' });
    }

    const comments = await commentService.getAllComments(postId);

    const payload = {
      total: comments.total,
      comments: comments.comments,
    };

    res.status(STATUS_CODES.OK).json(payload);
  } catch (err) {
    console.error(err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await commentService.getCommentById(id);
    if (!comment)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json(ERROR_MESSAGES.COMMENT_NOT_FOUND || 'Comment not found');

    // Check if the user is the owner of the comment
    if (comment.userId !== req.user.userId) {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ error: 'You are not authorized to delete this comment' });
    }

    await commentService.deleteComment(id);
    res.status(STATUS_CODES.OK).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  createComment,
  getAllComments,
  deleteComment,
};
