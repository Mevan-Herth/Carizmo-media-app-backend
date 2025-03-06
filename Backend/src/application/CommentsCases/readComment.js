// src/application/postCases/readComment.js
const Comment = require('../../infrastructure/database/models/commentSchema');

async function readComment(commentId) {
    try {
        const comment = await Comment.findById(commentId)
            .populate('userId', 'username profilePicture')
            .exec();
            
        if (!comment || comment.isDeleted) {
            throw new Error('Comment not found or has been deleted');
        }
        
        return comment;
    } catch (error) {
        throw new Error(`Failed to read comment: ${error.message}`);
    }
}

async function readCommentsByPost(postId) {
    try {
        const comments = await Comment.find({ 
            postId: postId,
            isDeleted: false
        })
        .populate('userId', 'username profilePicture')
        .sort({ createdAt: -1 })
        .exec();
        
        return comments;
    } catch (error) {
        throw new Error(`Failed to read comments for post: ${error.message}`);
    }
}

module.exports = {
    readComment,
    readCommentsByPost
};