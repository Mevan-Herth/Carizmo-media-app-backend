// src/application/postCases/deleteComment.js
const Comment = require('../../infrastructure/database/models/commentSchema');

async function deleteComment(commentId, userId, isSuperUser = false) {
    try {
        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            throw new Error('Comment not found');
        }
        
        // Check if user is authorized to delete (either the comment owner or a super user)
        if (!isSuperUser && comment.userId.toString() !== userId.toString()) {
            throw new Error('Unauthorized: You can only delete your own comments');
        }
        
        // Soft delete - mark as deleted but keep in database
        comment.isDeleted = true;
        comment.content = "[This comment has been deleted]";
        comment.updatedAt = Date.now();
        
        await comment.save();
        return { success: true, message: 'Comment deleted successfully' };
    } catch (error) {
        throw new Error(`Failed to delete comment: ${error.message}`);
    }
}

module.exports = deleteComment;