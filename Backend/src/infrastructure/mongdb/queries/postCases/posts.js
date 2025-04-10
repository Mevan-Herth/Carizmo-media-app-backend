const mongoose = require("mongoose")

const getMultPost = async(postDb,page=1,userId)=>{
    let pgCount = 10
    let query = {}
    let id = new mongoose.mongo.ObjectId(userId)

    if(userId)query = {userId:id}
    console.log(query)

    return postDb.find(query).sort({createdAt:-1}).skip(pgCount*page).limit(pgCount)
}

const getPost = async (postDb,id) => {
  const post = await postDb.findById(id);

  if(!post) return null

  return post
}

const getUserPost = async (postDb,userId) =>{
    return await postDb.find({userId:userId})
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
    getPost, getUserPost, addPost, deletePost, getMultPost
}