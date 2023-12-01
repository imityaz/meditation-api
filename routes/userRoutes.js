const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/auth/userController');
//const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
//router.post('/me', protect, getMe);

module.exports = router