const userDao = require('../services/user.service');
const { hashPassword } = require('../services/password.service');
const { STATUS_CODES } = require('../constants/status-code.constants');
const { ERROR_MESSAGES } = require('../constants/error.constants');

const createUser = async (req, res) => {
  try {
    let { userName, email, mobile, password, is_subscribed } = req.body;

    // validate request body
    if (!userName || !email || !mobile || !password || !is_subscribed) {
      return res.status(STATUS_CODES.FORBIDDEN).json(ERROR_MESSAGES.INVALID_REQUEST_BODY);
    }

    // check email already exist
    const existUser = await userDao.getUserByEmail(email);
    if (existUser)
      return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json(ERROR_MESSAGES.USER_ALREADY_EXISTS);

    password = await hashPassword(password);

    const createdUser = await userDao.createUser(userName, email, mobile, password, is_subscribed);

    // Remove password from user data
    createdUser.password = undefined;

    res.status(STATUS_CODES.CREATED).json(createdUser);
  } catch (err) {
    console.log(err.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userDao.getAllUsers();

    // Remove password from user data
    users.forEach((user) => {
      user.password = undefined;
    });

    res.status(STATUS_CODES.OK).json(users);
  } catch (err) {
    console.log(err.message);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    // check if user exists
    const existUser = await userDao.getUserById(id);
    if (!existUser) return res.status(STATUS_CODES.NOT_FOUND).json(ERROR_MESSAGES.USER_NOT_FOUND);

    const user = await userDao.getUserById(id);

    // Remove password from user data
    user.password = undefined;

    res.status(STATUS_CODES.OK).json(user);
  } catch (err) {
    console.log(err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // check if user exists
    const existUserById = await userDao.getUserById(id);
    if (!existUserById)
      return res.status(STATUS_CODES.NOT_FOUND).json(ERROR_MESSAGES.USER_NOT_FOUND);

    // check email already exist
    if (req.body.email) {
      const existUserByEmail = await userDao.getUserByEmail(req.body.email);

      if (existUserByEmail && existUserByEmail.id != id)
        return res.status(STATUS_CODES.FORBIDDEN).json('Forbidden!');
    }

    console.log(req.body, '---------------------');

    const updatedUser = await userDao.updateUser(id, req.body);

    // Remove password from user data
    updatedUser.password = undefined;

    res.status(STATUS_CODES.OK).json(updatedUser);
  } catch (err) {
    console.log(err.message);
  }
};

const updateStatusUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // validate request body
    if (status === undefined || status === null) {
      return res.status(STATUS_CODES.FORBIDDEN).json(ERROR_MESSAGES.INVALID_REQUEST_BODY);
    }

    // check if user exists
    const existUser = await userDao.getUserById(id);
    if (!existUser) return res.status(STATUS_CODES.NOT_FOUND).json(ERROR_MESSAGES.USER_NOT_FOUND);

    // check if user is self deactivating
    if (existUser.id == req.user.userId)
      return res.status(STATUS_CODES.FORBIDDEN).json(ERROR_MESSAGES.SELF_DEACTIVATION_NOT_ALLOWED);

    const updatedUser = await userDao.updateUser(id, { status });

    // Remove password from user data
    updatedUser.password = undefined;

    res.status(STATUS_CODES.OK).json(updatedUser);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    // check if user exists
    const existUser = await userDao.getUserById(id);
    if (!existUser) return res.status(STATUS_CODES.NOT_FOUND).json(ERROR_MESSAGES.USER_NOT_FOUND);

    // check if user is self deleting
    if (existUser.id == req.user.userId)
      return res.status(STATUS_CODES.FORBIDDEN).json(ERROR_MESSAGES.SELF_DELETE_NOT_ALLOWED);

    await userDao.deleteUser(id);

    res.status(STATUS_CODES.OK).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  updateStatusUser,
  deleteUser,
};
