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
    }
})
module.exports = mongoose.model('Post', PostSchema);