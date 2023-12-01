const express = require('express')
const router = express.Router()
const { getCommunityPosts, createCommunityPost } = require('../controllers/community/communityController');
//const { protect } = require('../middleware/authMiddleware');

router.get('/community-posts', getCommunityPosts);
router.post('/community-posts', createCommunityPost);
//router.post('/me', protect, getMe);

module.exports = router