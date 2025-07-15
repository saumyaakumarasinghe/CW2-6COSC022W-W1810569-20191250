const express = require('express');
const authController = require('../../controllers/auth.controller');
const authRouter = express.Router();

const { checkAuth } = require('../../middleware/token.middleware');

authRouter.post('/register', authController.registerUser);

authRouter.post('/login', authController.loginUser);

authRouter.post('/reset-password', checkAuth, authController.resetPassword);

module.exports = authRouter;
