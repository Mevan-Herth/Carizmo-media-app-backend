// src/application/postCases/createComment.js
const Comment = require('../../infrastructure/database/models/commentSchema');
const Post = require('../../infrastructure/database/models/PostSchema');
const User = require('../../infrastructure/database/models/UserModel');

async function createComment(userId, postId, content, parentCommentId = null) {
    try {
        // Create the comment
        const comment = new Comment({
            content,
            postId,
            userId,
            parentCommentId
        });

        await comment.save();
        return comment;
    } catch (error) {
        throw new Error(`Failed to create comment: ${error.message}`);
    }
}

module.exports = createComment;