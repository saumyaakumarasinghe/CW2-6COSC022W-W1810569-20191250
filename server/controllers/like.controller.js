const likeService = require('../services/like.service');
const { STATUS_CODES } = require('../constants/status-code.constants');
const { ERROR_MESSAGES } = require('../constants/error.constants');

const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user;

    if (!postId) {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ error: ERROR_MESSAGES.INVALID_REQUEST_PARAMS });
    }

    const result = await likeService.likePost(userId, postId);
    res.status(STATUS_CODES.OK).json(result);
  } catch (err) {
    console.error('Error toggling like:', err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json({ error: ERROR_MESSAGES.INVALID_REQUEST_PARAMS });
    }

    // const likes = await likeService.getPostLikes(postId);
    const likes = 10;
    res.status(STATUS_CODES.OK).json({ message: 'Post likes retrieved successfully', likes });
  } catch (err) {
    console.error('Error fetching post likes:', err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const toggleDislike = async (req, res) => {
  try {
    const { userId } = req.user;

    const likes = await likeService.getUserLikes(userId);
    res.status(STATUS_CODES.OK).json({ message: 'User likes retrieved successfully', likes });
  } catch (err) {
    console.error('Error fetching user likes:', err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  toggleLike,
  getPostLikes,
  toggleDislike,
};
