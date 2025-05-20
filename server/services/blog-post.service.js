const { BlogPosts, sequelize } = require('../models/index');

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

async function getAllBlogPosts() {
  try {
    return await BlogPosts.findAll();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

async function getBlogPostById(postId) {
  try {
    return await BlogPosts.findOne({
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
    return await getBlogPostById(postId);
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
}

async function deleteBlogPost(postId) {
  try {
    const result = await BlogPosts.destroy({
      where: { id: postId },
      transaction,
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
