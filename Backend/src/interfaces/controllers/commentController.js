// src/interfaces/controllers/commentController.js
const {
    createComment,
    getCommentById,
    getCommentsByPostId,
    updateComment,
    deleteComment,
    toggleLikeComment
  } = require('../../application/postCases/comments');
  
  class CommentController {
    async createComment(req, res) {
      try {
        const { postId, content } = req.body;
        const userId = req.user.id; // Assuming auth middleware adds user to req
  
        if (!content || !postId) {
          return res.status(400).json({ error: 'Post ID and content are required' });
        }
  
        const comment = await createComment(userId, postId, content);
        res.status(201).json(comment);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async getComment(req, res) {
      try {
        const { commentId } = req.params;
        const comment = await getCommentById(commentId);
        res.status(200).json(comment);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }
  
    async getCommentsByPost(req, res) {
      try {
        const { postId } = req.params;
        const comments = await getCommentsByPostId(postId);
        res.status(200).json(comments);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async updateComment(req, res) {
      try {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.user.id; // Assuming auth middleware adds user to req
  
        if (!content) {
          return res.status(400).json({ error: 'Content is required' });
        }
  
        const updatedComment = await updateComment(commentId, userId, content);
        res.status(200).json(updatedComment);
      } catch (error) {
        if (error.message.includes('Unauthorized')) {
          return res.status(403).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
      }
    }
  
    async deleteComment(req, res) {
      try {
        const { commentId } = req.params;
        const userId = req.user.id; // Assuming auth middleware adds user to req
        
        // Check if user is a super user (admin)
        const isSuperUser = req.user.role === 'admin'; // Adjust based on your auth setup
        
        const result = await deleteComment(commentId, userId, isSuperUser);
        res.status(200).json(result);
      } catch (error) {
        if (error.message.includes('Unauthorized')) {
          return res.status(403).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
      }
    }
  
    async likeComment(req, res) {
      try {
        const { commentId } = req.params;
        const userId = req.user.id; // Assuming auth middleware adds user to req
        
        const result = await toggleLikeComment(commentId, userId);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  module.exports = new CommentController();