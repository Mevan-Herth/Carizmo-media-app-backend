const Post = require("./mongodb/models/Post");

const getPost = async (id) => {
  const post = await Post.findById(id);

  if(!post) return null

  return post
}

const addPost = async (post) => {
    Post.
}

export default {
    getPost, addPost
}