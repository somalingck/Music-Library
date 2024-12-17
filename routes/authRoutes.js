const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// 1. POST /signup: Register a new user
router.post('/signup', authController.signup);

// 2. POST /login: Login a user
router.post('/login', authController.login);

// 0. GET /logout: Logout a user
router.get('/logout', authController.logout);

module.exports = router;
