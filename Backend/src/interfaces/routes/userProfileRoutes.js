const express = require('express');
const UserController = require('../controllers/UserController');


const router = express.Router();

// Protected route
router.get('/profile', UserController.profile);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.deleteUser);


module.exports = router;