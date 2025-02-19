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
        type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        required:false
    },
    likes:{
        type: Number,
        required:true
    }
},
{ timestamps: true })


module.exports = mongoose.model('Post', PostSchema);