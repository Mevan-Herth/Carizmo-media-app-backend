const express = require('express');
const UserController = require('../../../infrastructure/UserController');
const dependencies = require('../../../infrastructure/dependencies/dependencies');


const userController = new UserController(dependencies);


const router = express.Router();

// Protected route
router.get('/profile', userController.profile.bind(userController));
router.put('/:id', userController.update.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));
router.post('/logout', userController.LogoutUser.bind(userController));
router.post('/follow', userController.followUser.bind(userController));


module.exports = router;