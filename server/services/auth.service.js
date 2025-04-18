const { ROLE } = require('../constants');
const userDao = require('../dao/user.dao');
const { hashPassword, comparePassword } = require('./password.service');
const { generateToken } = require('./token.service');
const { generateApiKey } = require('./crypto.service');
const { createApiKey } = require('../dao/api-key.dao');
const { updateUser } = require('../dao/user.dao');
const { sequelize } = require('../models/index');
const { ERROR_MESSAGES } = require('../constants/error.constants');
const { STATUS_CODES } = require('../constants/status-code.constants');

const login = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { email, password } = req.body;

    // validate request body
    if (!email || !password) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json(ERROR_MESSAGES.INVALID_REQUEST_BODY);
    }

    // check if user exists
    const existUser = await userDao.getUserByEmail(email);
    if (!existUser)
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json(ERROR_MESSAGES.USER_NOT_FOUND);

    if (existUser.status === false)
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json(ERROR_MESSAGES.USER_NOT_ACTIVE);

    const loggedIn = await comparePassword(password, existUser.password);
    if (!loggedIn)
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json(ERROR_MESSAGES.INVALID_CREDENTIALS);

    // update last active at
    const now = Date.now();
    const updatedUser = await updateUser(existUser.id, { now }, transaction);

    const apiKey = await generateApiKey();
    // create api key
    await createApiKey(apiKey, Number(existUser.id), transaction);

    // create token
    const tokenPayload = {
      userId: existUser.id,
      role: existUser.role,
      status: existUser.status,
      lastActiveAt: updatedUser.lastActiveAt,
    };
    const token = await generateToken(tokenPayload);

    const payload = {
      message: 'Login successful',
      token,
      apiKey,
      user: {
        id: existUser.id,
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        email: existUser.email,
        role: existUser.role,
        status: existUser.status,
      },
    };
    await transaction.commit();
    res.status(STATUS_CODES.OK).json(payload);
  } catch (err) {
    await transaction.rollback();
    console.log(err.message);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.LOGIN_FAILED);
  }
};

const register = async (req, res) => {
  try {
    let { firstName, lastName, email, mobile, password } = req.body;

    // validate request body
    if (!firstName || !lastName || !email || !mobile || !password) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json(ERROR_MESSAGES.INVALID_REQUEST_BODY);
    }

    // check email already exist
    const existUser = await userDao.getUserByEmail(email);
    if (existUser)
      return res
        .status(STATUS_CODES.FORBIDDEN)
        .json(ERROR_MESSAGES.USER_ALREADY_EXISTS);

    password = await hashPassword(password);
    const role = ROLE.USER;

    const user = await userDao.createUser(
      firstName,
      lastName,
      email,
      mobile,
      password,
      role
    );

    const payload = {
      userId: user.id,
    };
    res.status(STATUS_CODES.OK).json(payload);
  } catch (err) {
    console.log(err.message);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.REGISTRATION_FAILED);
  }
};

module.exports = {
  login,
  register,
};
