const followService = require('../services/follow.service');
const { STATUS_CODES } = require('../constants/status-code.constants');
const { ERROR_MESSAGES } = require('../constants/error.constants');

const toggleFollow = async (req, res) => {
  try {
    const { userId } = req.user;
    const { followedId } = req.params;

    if (!followedId) {
      return res.status(STATUS_CODES.FORBIDDEN).json(ERROR_MESSAGES.INVALID_REQUEST_PARAMS);
    }

    const result = await followService.toggleFollow(userId, parseInt(followedId));

    res.status(STATUS_CODES.OK).json(result);
  } catch (err) {
    console.error('Error toggling follow:', err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const getFollowing = async (req, res) => {
  try {
    const { userId } = req.user;

    const following = await followService.getFollowing(userId);

    res.status(STATUS_CODES.OK).json(following);
  } catch (err) {
    console.error('Error fetching following:', err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const getFollowers = async (req, res) => {
  try {
    const { userId } = req.user;

    const followers = await followService.getFollowers(userId);

    res.status(STATUS_CODES.OK).json(followers);
  } catch (err) {
    console.error('Error fetching followers:', err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const getFollowStats = async (req, res) => {
  try {
    const { userId } = req.user;
    const stats = await followService.getFollowStats(userId);
    res.status(STATUS_CODES.OK).json(stats);
  } catch (err) {
    console.error('Error fetching follow stats:', err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  toggleFollow,
  getFollowing,
  getFollowers,
  getFollowStats,
};
