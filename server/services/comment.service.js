const { comments: Comments, users, blog_posts: BlogPosts } = require('../models/index');
const { Op } = require('sequelize');

async function createComment({ userId, postId, content }) {
  try {
    return await Comments.create({
      userId,
      postId,
      content,
      status: 'active',
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}

async function getAllComments(postId) {
  try {
    const whereClause = { postId };

    const { count, rows } = await Comments.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: users,
          attributes: ['id', 'firstName', 'lastName', 'userName', 'email'],
          as: 'user',
        },
      ],
    });

    return {
      total: count,
      comments: rows,
    };
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

async function getCommentById(commentId) {
  try {
    return Comments.findOne({
      where: { id: commentId },
      include: [
        {
          model: users,
          attributes: ['id', 'userName', 'email'],
          as: 'user',
        },
      ],
    });
  } catch (error) {
    console.error('Error fetching comment by ID:', error);
    throw error;
  }
}

async function deleteComment(commentId) {
  try {
    const result = await Comments.destroy({
      where: { id: commentId },
    });
    return result;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
}

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  deleteComment,
};
