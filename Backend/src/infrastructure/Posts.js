const postQuery = require("./mongdb/queries/postCases/posts")
const commentQuery = require("./mongdb/queries/postCases/comments")

const getPostPage = (dependencies) => async(postId,commentPage) =>{
    const postClient = dependencies.Client
    const postModel = postClient.postModel
    const commentModel = postClient.commentModel

    post =  await postQuery.getPost(postModel,postId)
    if(!post) throw Error("Post not found");

    comments = await commentQuery.getCommentsByPostId(postId)

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
        const result = await postQuery.addPost(postClient.postModel,postObj)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deletePost = async(postId,userId)=>{
    result = await postQuery.deletePost(postClient.postModel,postId,userId)

    if (!result){throw Error("User's post not found")}
}

const updatePost = async (postId)=>{
    
}

module.exports = {getPostPage, getUserPosts,addPost,deletePost}