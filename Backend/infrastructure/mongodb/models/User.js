const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] // Basic email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],// These fields are arrays that store references to other users in the database.
        default: []
    },
    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],// These fields are arrays that store references to other users in the database.
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true } // Adds createdAt and updatedAt
); 
module.exports = mongoose.model('User', UserSchema);