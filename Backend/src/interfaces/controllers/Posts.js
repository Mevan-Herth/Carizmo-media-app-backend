const postCase = require("../../application/postCases/posts")
const postClient =require("../../domain/PostDbClient")
const commentCase = require("../../application/postCases/comments")
const model = require("../../infrastructure/database/models/PostSchema")

const getPostPage = async(postId,commentPage) =>{
    post =  await postCase.getPost(postClient.postModel,postId)
    if(!post) return null;

    comments = await commentCase.getCommentsByPostId(postId)

    return {"post":post,"comments":comments}
}

const getUserPosts = async(userId, page) =>{

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

const updatePost = async (postId)=>{
    
}

module.exports = {getPostPage, getUserPosts,addPost,deletePost}