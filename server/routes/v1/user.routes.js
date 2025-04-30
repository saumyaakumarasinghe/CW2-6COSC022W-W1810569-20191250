const express = require('express');
const userService = require('../../services/user.service');
const userRoutes = express.Router();

userRoutes.post('/', userService.createUser);

userRoutes.get('/', userService.getAllUsers);

userRoutes.get('/:id', userService.getSingleUser);

userRoutes.patch('/:id/status', userService.updateStatusUser);

userRoutes.put('/:id', userService.updateUser);

userRoutes.delete('/:id', userService.deleteUser);

module.exports = userRoutes;
