const CommentCrud = require('../../application/CommentCases/commentCrud');

class CommentController {
  static async createComment(req, res) {
    try {
      const { postId, content } = req.body;
      const userId = req.userId; // From auth middleware

      const newComment = await CommentCrud.createComment(postId, userId, content);
      res.status(201).json({ message: 'Comment created successfully', data: newComment });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getComments(req, res) {
    try {
      const { postId } = req.params;
      const comments = await CommentCrud.getCommentsByPostId(postId);
      res.status(200).json({ message: 'Comments retrieved successfully', data: comments });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateComment(req, res) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const userId = req.userId; // From auth middleware

      const updatedComment = await CommentCrud.updateComment(commentId, userId, content);
      res.status(200).json({ message: 'Comment updated successfully', data: updatedComment });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async deleteComment(req, res) {
    try {
      const { commentId } = req.params;
      const userId = req.userId; // From auth middleware

      const result = await CommentCrud.deleteComment(commentId, userId);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = CommentController;
