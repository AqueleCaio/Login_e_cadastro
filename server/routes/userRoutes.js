const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Rota para registro de usuários
router.post('/register', userController.registerUser);

module.exports = router;
