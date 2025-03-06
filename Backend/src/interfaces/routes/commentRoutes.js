// src/interfaces/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Create a new comment
router.post('/', commentController.createComment);

// Get a specific comment
router.get('/:commentId', commentController.getComment);

// Get all comments for a post
router.get('/post/:postId', commentController.getCommentsByPost);

// Update a comment
router.put('/:commentId', commentController.updateComment);

// Delete a comment
router.delete('/:commentId', commentController.deleteComment);

// Like/unlike a comment
router.post('/:commentId/like', commentController.likeComment);

module.exports = router;