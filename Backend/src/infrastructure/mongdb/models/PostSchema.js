const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
    },
    mainText:{
        type: String,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User' ,
        required:true,
    },
    likes:{
        type: Number,
        required:true,
        default: 0
    },
    votedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    
},
{ timestamps: true })


module.exports = mongoose.model('Post', PostSchema);