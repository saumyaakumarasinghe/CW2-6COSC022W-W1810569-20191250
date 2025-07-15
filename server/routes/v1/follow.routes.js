const express = require('express');
const followRouter = express.Router();
const followController = require('../../controllers/follow.controller');

// Toggle follow/unfollow for a user
followRouter.post('/:followedId', followController.toggleFollow);

// Get users that the current user is following
followRouter.get('/following', followController.getFollowing);

// Get users that follow the current user
followRouter.get('/followers', followController.getFollowers);

// Get following and followers count
followRouter.get('/stats', followController.getFollowStats);

module.exports = followRouter;
