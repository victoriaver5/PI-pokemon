const LoginController = require('../controllers/loginController');
const express = require('express');


const router = express.Router();

router.post('/pokemon/login', LoginController.login);

module.exports = router;