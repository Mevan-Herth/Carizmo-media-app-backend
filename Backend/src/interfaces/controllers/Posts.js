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
        "likes":0
    }

    try {
        const result = await postCase.addPost(postClient.postModel,postObj)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deletePost = async(postId)=>{
    try{await postCase.deletePost(postClient.postModel,postId)}
    catch(err){
        console.log(err["name"])
        if (err["name"] == "CastError") throw new Error("Post not found")
    }
}

module.exports = {getPostPage,addPost,deletePost}