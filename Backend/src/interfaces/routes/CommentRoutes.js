const express = require('express');
const CommentController = require('../controllers/CommentController');
const { authMiddleware } = require('../../shared/middlewares/authMiddleware');

const router = express.Router();

// Public route to get comments by postId
router.get('/:postId', CommentController.getComments);

// routes for creating, updating, and deleting comments
router.use(authMiddleware);
router.post('/', CommentController.createComment);
router.put('/:commentId', CommentController.updateComment);
router.delete('/:commentId', CommentController.deleteComment);

module.exports = router;
