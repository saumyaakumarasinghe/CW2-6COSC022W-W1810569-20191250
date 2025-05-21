const { blog_posts: BlogPosts, sequelize, users } = require('../models/index');
const { Op } = require('sequelize');

async function createBlogPost({ userId, title, content, country, visitDate, coverImage, commentsEnabled, likesEnabled }) {
  try {
    return await BlogPosts.create({
      userId,
      title,
      content,
      country,
      visitDate,
      coverImage,
      commentsEnabled,
      likesEnabled,
      likes: 0,
      status: 'active',
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

async function getAllBlogPosts(search_key, sort_by, limit, skip) {
  try {
    const whereClause = {};
    if (search_key) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search_key}%` } },
        { content: { [Op.like]: `%${search_key}%` } },
        { country: { [Op.like]: `%${search_key}%` } },
      ];
    }

    // First, get the most liked post
    const mostLikedPost = await BlogPosts.findOne({
      order: [['likes', 'DESC']],
      include: [
        {
          model: users,
          attributes: ['id', 'firstName', 'lastName', 'userName', 'email'],
          as: 'user',
        },
      ],
      raw: true,
      nest: true,
    });

    // Get the most recent post
    const mostRecentPost = await BlogPosts.findOne({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: users,
          attributes: ['id', 'firstName', 'lastName', 'userName', 'email'],
          as: 'user',
        },
      ],
      raw: true,
      nest: true,
    });

    // Get total count of regular posts (excluding special posts)
    const totalRegularCount = await BlogPosts.count({
      where: {
        ...whereClause,
        id: {
          [Op.notIn]: [mostLikedPost?.id || 0, mostRecentPost?.id || 0],
        },
      },
    });

    // Get regular posts with pagination
    const regularPosts = await BlogPosts.findAll({
      where: {
        ...whereClause,
        id: {
          [Op.notIn]: [mostLikedPost?.id || 0, mostRecentPost?.id || 0],
        },
      },
      limit: parseInt(limit) || 10,
      offset: parseInt(skip) || 0,
      order: [[sort_by || 'createdAt', 'DESC']],
      include: [
        {
          model: users,
          attributes: ['id', 'firstName', 'lastName', 'userName', 'email'],
          as: 'user',
        },
      ],
      raw: true,
      nest: true,
    });

    // Add type tags and combine posts
    const regularPostsWithType = regularPosts.map((post) => ({
      ...post,
      type: 'regular',
    }));

    const specialPosts = [];
    if (mostLikedPost) {
      specialPosts.push({
        ...mostLikedPost,
        type: 'most_liked',
      });
    }
    if (mostRecentPost && mostRecentPost.id !== mostLikedPost?.id) {
      specialPosts.push({
        ...mostRecentPost,
        type: 'most_recent',
      });
    }

    // Combine special posts with regular posts
    const allPosts = [...specialPosts, ...regularPostsWithType];

    return {
      total: totalRegularCount + specialPosts.length,
      posts: allPosts,
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

async function getBlogPostsByUserId(userId) {
  try {
    return BlogPosts.findAll({
      where: { userId: userId },
    });
  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    throw error;
  }
}

async function getBlogPostById(postId) {
  try {
    return BlogPosts.findOne({
      where: { id: postId },
      include: [
        {
          model: users,
          attributes: ['id', 'firstName', 'lastName', 'userName', 'email'],
          as: 'user',
        },
      ],
    });
  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    throw error;
  }
}

async function updateBlogPost(postId, updateData) {
  try {
    await BlogPosts.update(updateData, { where: { id: postId } });

    return getBlogPostById(postId);
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

async function deleteBlogPost(postId) {
  try {
    const result = await BlogPosts.destroy({
      where: { id: postId },
    });

    return result;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostsByUserId,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};
