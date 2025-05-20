const { Likes, BlogPosts } = require('../models');
const { ERROR_MESSAGES } = require('../constants/error.constants');

const likePost = async (userId, postId) => {
  try {
    // Check if post exists and is active
    const post = await BlogPosts.findOne({
      where: {
        id: postId,
        status: 'active',
        likesEnabled: true
      }
    });

    if (!post) {
      throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
    }

    // Check if user has already liked the post
    const existingLike = await Likes.findOne({
      where: {
        userId,
        postId
      }
    });

    if (existingLike) {
      // Unlike the post
      await existingLike.destroy();
      await post.decrement('likes');
      return { message: 'Post unliked successfully', liked: false };
    }

    // Create new like
    await Likes.create({ userId, postId });
    await post.increment('likes');
    return { message: 'Post liked successfully', liked: true };
  } catch (error) {
    throw error;
  }
};

const getPostLikes = async (postId) => {
  try {
    const likes = await Likes.findAll({
      where: { postId },
      include: [{
        model: BlogPosts,
        as: 'post',
        attributes: ['id', 'title', 'likes']
      }]
    });
    return likes;
  } catch (error) {
    throw error;
  }
};

const getUserLikes = async (userId) => {
  try {
    const likes = await Likes.findAll({
      where: { userId },
      include: [{
        model: BlogPosts,
        as: 'post',
        attributes: ['id', 'title', 'likes']
      }]
    });
    return likes;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  likePost,
  getPostLikes,
  getUserLikes
}; 