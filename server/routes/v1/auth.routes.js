const express = require('express');
const authController = require('../../controllers/auth.controller');
const authRoutes = express.Router();

const { checkAuth } = require('../../middleware/check-token.middleware');

authRoutes.post('/register', authController.register);

authRoutes.post('/login', authController.login);

authRoutes.post('/reset-password', checkAuth, authController.resetPassword);

module.exports = authRoutes;
