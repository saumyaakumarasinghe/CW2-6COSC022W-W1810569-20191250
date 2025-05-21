const userService = require('../services/user.service');
const { hashPassword, comparePassword } = require('../utils/password.util');
const { generateToken } = require('../utils/token.util');
const { sequelize } = require('../models/index');
const { ERROR_MESSAGES } = require('../constants/error.constants');
const { STATUS_CODES } = require('../constants/status-code.constants');

const login = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { email, password } = req.body;

    // validate request body
    if (!email || !password) {
      return res.status(STATUS_CODES.BAD_REQUEST).json(ERROR_MESSAGES.INVALID_REQUEST_BODY);
    }

    // check if user exists
    const existUser = await userService.getUserByEmail(email);
    if (!existUser) return res.status(STATUS_CODES.NOT_FOUND).json(ERROR_MESSAGES.USER_NOT_FOUND);

    if (existUser.status === false)
      return res.status(STATUS_CODES.FORBIDDEN).json(ERROR_MESSAGES.USER_NOT_ACTIVE);

    const loggedIn = await comparePassword(password, existUser.password);
    if (!loggedIn)
      return res.status(STATUS_CODES.UNAUTHORIZED).json(ERROR_MESSAGES.INVALID_CREDENTIALS);

    // update last active at
    const now = Date.now();
    const updatedUser = await userService.updateUser(existUser.id, { now }, transaction);

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
      user: {
        id: existUser.id,
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        userName: existUser.userName,
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
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERROR_MESSAGES.LOGIN_FAILED);
  }
};

const register = async (req, res) => {
  try {
    let { userName, firstName, lastName, email, mobile, password } = req.body;

    // validate request body
    if (!userName || !email || !mobile || !password || !firstName || !lastName) {
      return res.status(STATUS_CODES.BAD_REQUEST).json(ERROR_MESSAGES.INVALID_REQUEST_BODY);
    }

    // check email already exist
    const existUser = await userService.getUserByEmail(email);
    if (existUser)
      return res.status(STATUS_CODES.FORBIDDEN).json(ERROR_MESSAGES.USER_ALREADY_EXISTS);

    password = await hashPassword(password);

    const user = await userService.createUser(
      userName,
      email,
      mobile,
      password,
      firstName,
      lastName
    );

    const payload = {
      userId: user.id,
    };
    res.status(STATUS_CODES.OK).json(payload);
  } catch (err) {
    console.log(err.message);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERROR_MESSAGES.REGISTRATION_FAILED);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // validate request body
    if (!oldPassword || !newPassword) {
      return res.status(STATUS_CODES.BAD_REQUEST).json(ERROR_MESSAGES.INVALID_REQUEST_BODY);
    }

    // verify old password
    const isPasswordValid = await comparePassword(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    // hash new password
    const hashedPassword = await hashPassword(newPassword);

    // update password
    await userService.updateUser(user.id, { password: hashedPassword });

    res.status(STATUS_CODES.OK).json({
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(ERROR_MESSAGES.PASSWORD_RESET_FAILED);
  }
};

module.exports = {
  login,
  register,
  resetPassword,
};
