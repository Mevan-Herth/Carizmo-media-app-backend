// src/application/postCases/updateComment.js
const Comment = require('../../infrastructure/database/models/commentSchema');

async function updateComment(commentId, userId, content) {
    try {
        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            throw new Error('Comment not found');
        }
        
        // Only allow the comment owner to update it
        if (comment.userId.toString() !== userId.toString()) {
            throw new Error('Unauthorized: You can only edit your own comments');
        }
        
        comment.content = content;
        comment.updatedAt = Date.now();
        
        await comment.save();
        return comment;
    } catch (error) {
        throw new Error(`Failed to update comment: ${error.message}`);
    }
}

module.exports = updateComment;