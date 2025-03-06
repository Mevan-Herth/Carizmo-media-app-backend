const Post = require("../../infrastructure/database/models/PostSchema");
const mongoose = require("mongoose")

const getPost = async (postDb,id) => {
  const post = await postDb.findById(id);

  if(!post) return null

  return post
}

const addPost = async (postDb, post) => {
    try {
        const newId = await new mongoose.Types.ObjectId()
        const newPost = new postDb({
            _id:newId,
            ...post,
        })
        await newPost.save()

        return newId
    } catch (error) {
        throw new Error(error)
    }
}

const deletePost = async(postDb,id,userId)=>{
    return await postDb.findOneAndDelete({_id:id,userId:userId})
}

module.exports = {
    getPost, addPost, deletePost
}