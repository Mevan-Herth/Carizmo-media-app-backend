// src/interfaces/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const dependencies = require('../../../infrastructure/dependencies/dependencies');
const CommentController = require('../../../infrastructure/commentController');

const commentController = new CommentController(dependencies)

// Create a new comment
router.post('/', commentController.createComment.bind(commentController));

// Get comment by post
router.get('/post-comments/:postId', commentController.getCommentsByPost.bind(commentController))

// Get a specific comment
router.get('/:commentId', commentController.getComment.bind(commentController));


// Update a comment
router.put('/:commentId', commentController.updateComment.bind(commentController));

// Delete a comment
router.delete('/:commentId', commentController.deleteComment.bind(commentController));


module.exports = router;