const express = require('express');
const UserController = require('../../../infrastructure/UserController');
const dependencies = require('../../../infrastructure/dependencies/dependencies');


const userController = new UserController(dependencies);

const router = express.Router();
router.post('/register', userController.register.bind(userController));
router.post('/login',userController.login.bind(userController));
router.post('/logout', userController.LogoutUser.bind(userController));



module.exports = router;
