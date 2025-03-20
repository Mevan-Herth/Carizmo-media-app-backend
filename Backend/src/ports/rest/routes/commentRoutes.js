// src/interfaces/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../../../infrastructure/commentController');

// Create a new comment
router.post('/', commentController.createComment);

// Get comment by post
router.get('/post-comments/:postId', commentController.getCommentsByPost)

// Get a specific comment
router.get('/:commentId', commentController.getComment);


// Update a comment
router.put('/:commentId', commentController.updateComment);

// Delete a comment
router.delete('/:commentId', commentController.deleteComment);


module.exports = router;