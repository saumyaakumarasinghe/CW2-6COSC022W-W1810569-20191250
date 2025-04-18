const express = require('express');
const authService = require('../../services/auth.service');
const authRoutes = express.Router();

authRoutes.post('/register', authService.register);

authRoutes.post('/login', authService.login);

module.exports = authRoutes;
