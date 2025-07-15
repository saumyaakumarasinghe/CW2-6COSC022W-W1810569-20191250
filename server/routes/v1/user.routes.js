const express = require('express');
const userController = require('../../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/', userController.createUser);

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:id', userController.getSingleUser);

userRouter.patch('/:id/status', userController.updateStatusUser);

userRouter.put('/:id', userController.updateUser);

userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
