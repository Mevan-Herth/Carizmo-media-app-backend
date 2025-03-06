// src/application/postCases/comments.js

const Comment = require('../../infrastructure/database/models/commentSchema');
const Post = require('../../infrastructure/database/models/PostSchema');

// Create a comment
const createComment = async (userId, postId, content) => {
  try {
    const comment = new Comment({
      content,
      postId,
      userId
    });

    await comment.save();
    return comment;
  } catch (error) {
    throw new Error(`Failed to create comment: ${error.message}`);
  }
};

// Get a comment by ID
const getCommentById = async (commentId) => {
  try {
    const comment = await Comment.findById(commentId)
      .populate('userId', 'username profilePicture')
      .exec();
      
    if (!comment || comment.isDeleted) {
      throw new Error('Comment not found or has been deleted');
    }
    
    return comment;
  } catch (error) {
    throw new Error(`Failed to get comment: ${error.message}`);
  }
};

// Get all comments for a post
const getCommentsByPostId = async (postId) => {
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
    throw new Error(`Failed to get comments for post: ${error.message}`);
  }
};

// Update a comment
const updateComment = async (commentId, userId, content) => {
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
};

// Delete a comment
const deleteComment = async (commentId, userId) => {
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    
    if (!comment) {
      throw new Error('Comment not found');
    }
    
    // Check if user is authorized to delete (either the comment owner or a super user)
    if (comment.userId.toString() !== userId.toString()) {
      throw new Error('Unauthorized: You can only delete your own comments');
    }

    return { success: true, message: 'Comment deleted successfully' };
  } catch (error) {
    throw new Error(`Failed to delete comment: ${error.message}`);
  }
};

// Like/unlike a comment
const toggleLikeComment = async (commentId, userId) => {
  try {
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      throw new Error('Comment not found');
    }

    // Check if user already liked the comment
    const alreadyLiked = comment.likes.includes(userId);
    
    if (alreadyLiked) {
      // Remove like
      comment.likes = comment.likes.filter(id => id.toString() !== userId.toString());
    } else {
      // Add like
      comment.likes.push(userId);
    }

    await comment.save();
    return { 
      likes: comment.likes.length,
      liked: !alreadyLiked
    };
  } catch (error) {
    throw new Error(`Failed to toggle like for comment: ${error.message}`);
  }
};

module.exports = {
  createComment,
  getCommentById,
  getCommentsByPostId,
  updateComment,
  deleteComment,
  toggleLikeComment
};