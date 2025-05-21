const blogPostService = require('../services/blog-post.service');
const { STATUS_CODES } = require('../constants/status-code.constants');
const { ERROR_MESSAGES } = require('../constants/error.constants');

const createBlogPost = async (req, res) => {
  try {
    const { title, content, country, visit_date, cover_image, comments_enabled, likes_enabled } =
      req.body;

    const { userId } = req.user;

    if (!userId || !title || !content || !country) {
      return res.status(STATUS_CODES.FORBIDDEN).json(ERROR_MESSAGES.INVALID_REQUEST_BODY);
    }

    const createdBlogPost = await blogPostService.createBlogPost({
      userId,
      title,
      content,
      country,
      visit_date,
      cover_image,
      comments_enabled,
      likes_enabled,
    });

    res.status(STATUS_CODES.CREATED).json(createdBlogPost);
  } catch (err) {
    console.error('Error creating blog post:', err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getAllBlogPosts = async (req, res) => {
  try {
    const { search_key, sort_by, limit, skip } = req.query;

    // Validate sort_by to prevent SQL injection
    const allowedSortFields = ['createdAt', 'updatedAt', 'title', 'country', 'likes', 'visitDate'];
    const validatedSortBy = allowedSortFields.includes(sort_by) ? sort_by : 'createdAt';

    const posts = await blogPostService.getAllBlogPosts(search_key, validatedSortBy, limit, skip);

    const payload = {
      total: posts.total,
      posts: posts.posts,
      limit: limit,
      skip: skip,
    };

    res.status(STATUS_CODES.OK).json(payload);
  } catch (err) {
    console.error(err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getAllBlogPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.user;

    const posts = await blogPostService.getBlogPostsByUserId(userId);

    res.status(STATUS_CODES.OK).json(posts);
  } catch (err) {
    console.error(err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getFeedByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await blogPostService.getBlogPostsByUserId(userId);

    res.status(STATUS_CODES.OK).json(posts);
  } catch (err) {
    console.error(err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getSingleBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await blogPostService.getBlogPostById(id);

    if (!post)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json(ERROR_MESSAGES.POST_NOT_FOUND || 'Post not found');

    res.status(STATUS_CODES.OK).json(post);
  } catch (err) {
    console.error(err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await blogPostService.getBlogPostById(id);
    if (!post)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json(ERROR_MESSAGES.POST_NOT_FOUND || 'Post not found');

    const updatedPost = await blogPostService.updateBlogPost(id, req.body);

    res.status(STATUS_CODES.OK).json(updatedPost);
  } catch (err) {
    console.error(err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await blogPostService.getBlogPostById(id);
    if (!post)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json(ERROR_MESSAGES.POST_NOT_FOUND || 'Post not found');

    await blogPostService.deleteBlogPost(id);
    res.status(STATUS_CODES.OK).json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getAllBlogPostsByUserId,
  getFeedByUserId,
  getSingleBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
