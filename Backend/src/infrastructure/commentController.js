// src/interfaces/controllers/commentController.js
const {
    createComment,
    getCommentById,
    getCommentsByPostId,
    updateComment,
    deleteComment,
    toggleLikeComment
  } = require('./mongdb/queries/postCases/comments');
  
  class CommentController {
    constructor(dependencies) {
      this.dependencies = dependencies;
      this.commentModel = dependencies.dbClient.commentModel;
      console.log(this.commentModel)
    }

    async createComment(req, res) {
      try {
        const { postId, content, userId} = req.body;

        if (!content || !postId) {
          return res.status(400).json({ error: 'Post ID and content are required' });
        }
  
        const comment = await createComment(this.commentModel,req.userId, postId, content);
        res.status(201).json(comment);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async getComment(req, res) {
      try {
        const { commentId } = req.params;
        const comment = await getCommentById(this.commentModel,commentId);
        res.status(200).json(comment);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }
  
    async getCommentsByPost(req, res) {
      try {
        const { postId } = req.params;
        const comments = await getCommentsByPostId(this.commentModel,postId);
        res.status(200).json(comments);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async updateComment(req, res) {
      try {
        const { commentId } = req.params;
        const { content, userId } = req.body;
  
        if (!content) {
          return res.status(400).json({ error: 'Content is required' });
        }
  
        const updatedComment = await updateComment(this.commentModel,commentId, userId, content);
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
        const {userId} = req.body;
        
        const result = await deleteComment(this.commentModel,commentId, userId);
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
        
        const result = await toggleLikeComment(this.commentModel,commentId, userId);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  module.exports = CommentController;