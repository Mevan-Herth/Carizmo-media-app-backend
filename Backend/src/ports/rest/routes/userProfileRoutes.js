const express = require('express');
const UserController = require('../../../infrastructure/UserController');


const router = express.Router();

// Protected route
router.get('/profile', UserController.profile);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.deleteUser);
router.post('/logout', UserController.LogoutUser);
router.post('/follow', UserController.followUser);


module.exports = router;