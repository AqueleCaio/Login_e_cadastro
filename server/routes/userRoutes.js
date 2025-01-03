const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Rota para registro de usuários
router.post('/register', userController.registerUser);

// Rota para login de usuários
router.post('/login', userController.loginUser);


module.exports = router;
