var express = require('express');
var router = express.Router();
var userController = require('../controllers/usersController');

router
    .route('/users/register')
    .post(userController.register)

router
    .route('/users/login')
    .post(userController.login)

module.exports = router;
