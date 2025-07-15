const { follows: Follows, users: Users } = require('../models');
const { ERROR_MESSAGES } = require('../constants/error.constants');

const toggleFollow = async (followerId, followedId) => {
  try {
    // Check if trying to follow self
    if (followerId === followedId) {
      throw new Error(ERROR_MESSAGES.CANNOT_FOLLOW_SELF);
    }

    // Check if followed user exists
    const followedUser = await Users.findOne({
      where: { id: followedId },
    });

    if (!followedUser) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Check if already following
    const existingFollow = await Follows.findOne({
      where: {
        followerId,
        followedId,
      },
    });

    if (existingFollow) {
      // Unfollow
      await existingFollow.destroy();
      return { message: 'Unfollowed successfully', following: false };
    }

    // Create new follow
    await Follows.create({ followerId, followedId });
    return { message: 'Followed successfully', following: true };
  } catch (error) {
    throw error;
  }
};

const getFollowing = async (userId) => {
  try {
    const following = await Follows.findAll({
      where: { followerId: userId },
      include: [
        {
          model: Users,
          as: 'Followed',
          attributes: ['id', 'userName', 'firstName', 'lastName', 'email'],
        },
      ],
    });

    return following.map((follow) => ({
      id: follow.Followed.id,
      userName: follow.Followed.userName,
      firstName: follow.Followed.firstName,
      lastName: follow.Followed.lastName,
      email: follow.Followed.email,
      followedAt: follow.createdAt,
    }));
  } catch (error) {
    throw error;
  }
};

const getFollowers = async (userId) => {
  try {
    const followers = await Follows.findAll({
      where: { followedId: userId },
      include: [
        {
          model: Users,
          as: 'Follower',
          attributes: ['id', 'userName', 'firstName', 'lastName', 'email'],
        },
      ],
    });

    return followers.map((follow) => ({
      id: follow.Follower.id,
      userName: follow.Follower.userName,
      firstName: follow.Follower.firstName,
      lastName: follow.Follower.lastName,
      email: follow.Follower.email,
      followedAt: follow.createdAt,
    }));
  } catch (error) {
    throw error;
  }
};

const getFollowStats = async (userId) => {
  try {
    const followingCount = await Follows.count({
      where: { followerId: userId },
    });

    const followersCount = await Follows.count({
      where: { followedId: userId },
    });

    return {
      followingCount,
      followersCount,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  toggleFollow,
  getFollowing,
  getFollowers,
  getFollowStats,
};
