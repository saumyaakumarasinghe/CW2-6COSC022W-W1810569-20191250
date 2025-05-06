const express = require('express');
const userController = require('../../controllers/user.controller');
const userRoutes = express.Router();

userRoutes.post('/', userController.createUser);

userRoutes.get('/', userController.getAllUsers);

userRoutes.get('/:id', userController.getSingleUser);

userRoutes.patch('/:id/status', userController.updateStatusUser);

userRoutes.put('/:id', userController.updateUser);

userRoutes.delete('/:id', userController.deleteUser);

module.exports = userRoutes;
