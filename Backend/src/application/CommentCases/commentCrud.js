const Comment = require('../../infrastructure/database/models/CommentSchema');

class CommentCrud {
  static async createComment(postId, userId, content) {
    try {
      const comment = new Comment({
        postId,
        userId,
        content,
        createdAt: new Date(),
      });
      return await comment.save();
    } catch (err) {
      throw new Error('Error creating comment: ' + err.message);
    }
  }

  static async getCommentsByPostId(postId) {
    try {
      return await Comment.find({ postId });
    } catch (err) {
      throw new Error('Error fetching comments: ' + err.message);
    }
  }

  static async updateComment(commentId, userId, content) {
    try {
      const comment = await Comment.findOne({ _id: commentId, userId });
      if (!comment) throw new Error('Comment not found or not authorized to update');
      
      comment.content = content;
      comment.updatedAt = new Date();
      return await comment.save();
    } catch (err) {
      throw new Error('Error updating comment: ' + err.message);
    }
  }

  static async deleteComment(commentId, userId) {
    try {
      const result = await Comment.deleteOne({ _id: commentId, userId });
      if (result.deletedCount === 0) {
        throw new Error('Comment not found or not authorized to delete');
      }
      return { message: 'Comment deleted successfully' };
    } catch (err) {
      throw new Error('Error deleting comment: ' + err.message);
    }
  }
}

module.exports = CommentCrud;
