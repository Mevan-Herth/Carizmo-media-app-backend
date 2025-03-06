const postCase = require("../../application/postCases/posts")
const postClient =require("../../domain/PostDbClient")
const model = require("../../infrastructure/database/models/PostSchema")

const getPostPage = async(postId) =>{
    return await postCase.getPost(postClient.postModel,postId)
}

const addPost = async(title,content,userId)=>{
    const postObj = {
        "title":title,
        "mainText":content,
        "userId":userId,
        "likes":0
    }

    try {
        const result = await postCase.addPost(postClient.postModel,postObj)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deletePost = async(postId,userId)=>{
    result = await postCase.deletePost(postClient.postModel,postId,userId)

    if (!result){throw Error("User's post not found")}
}

module.exports = {getPostPage,addPost,deletePost}