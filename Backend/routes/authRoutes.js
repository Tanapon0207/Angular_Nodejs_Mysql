const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// ตัวอย่างเส้นทางที่ต้องการยืนยันตัวตนด้วย JWT
router.get('/profile', authMiddleware.verifyToken, (req, res) => {
    res.json({ message: 'Profile data', user: req.user });
});

module.exports = router;
