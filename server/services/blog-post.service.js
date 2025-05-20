const { blog_posts: BlogPosts, sequelize } = require('../models/index');
const { Op } = require('sequelize');

async function createBlogPost({ userId, title, content, country, visitDate, coverImage }) {
  try {
    return await BlogPosts.create({
      userId,
      title,
      content,
      country,
      visitDate,
      coverImage,
      comments_enabled: true,
      likes_enabled: true,
      likes: 0,
      status: 'active',
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
}

async function getAllBlogPosts(search_key, sort_by) {
  try {
    const whereClause = {};
    if (search_key) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search_key}%` } },
        { content: { [Op.like]: `%${search_key}%` } },
        { country: { [Op.like]: `%${search_key}%` } },
      ];
    }

    const { count, rows } = await BlogPosts.findAndCountAll({
      where: whereClause,
      order: [[sort_by, 'DESC']],
    });

    return {
      total: count,
      posts: rows,
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

async function getBlogPostById(postId) {
  try {
    return BlogPosts.findOne({
      where: { id: postId },
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
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};
