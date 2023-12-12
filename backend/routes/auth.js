const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication.js');

const { register, login, logout } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', authenticateUser, logout);

module.exports = router;
