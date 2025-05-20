const express = require('express');
const router = express.Router();
const followController = require('../../controllers/follow.controller');

// Toggle follow/unfollow for a user
router.post('/:followedId', followController.toggleFollow);

// Get users that the current user is following
router.get('/following', followController.getFollowing);

// Get users that follow the current user
router.get('/followers', followController.getFollowers);

// Get following and followers count
router.get('/stats', followController.getFollowStats);

module.exports = router; 