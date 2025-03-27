const postQuery = require("./mongdb/queries/postCases/posts")
 const commentQuery = require("./mongdb/queries/postCases/comments")
 const fs = require('fs')
 
 const getPostPage = (dependencies) => async(postId,commentPage) =>{
     const postClient = dependencies.dbClient
     const postModel = postClient.postModel
     const commentModel = postClient.commentModel
 
     post =  await postQuery.getPost(postModel,postId)
     if(!post) throw Error("Post not found");
 
     comments = await commentQuery.getCommentsByPostId(postId)
 
     return {"post":post,"comments":comments}
 }
 
 const getUserPosts = (dependencies) => async(userId, page) =>{
     
 }
 
 const addPost = (dependencies) => async(title,content,userId,files)=>{
     const postClient = dependencies.dbClient
     const postModel = postClient.postModel
     
     const images=[]

    // updating database
    const updateDb = async()=>{
        console.log(images)
        const postObj = {
            "title":title,
            "mainText":content,
            "userId":userId,
            "likes":0,
            "images":images
        }
    
        const result = await postQuery.addPost(postModel,postObj)
        return result
    }

     //image
     if (files.postImages) {
         // Verify file exists
         if (!fs.existsSync(files.postImages[0].path)) {
             throw new Error('Profile picture file not found');
         }
 
         console.log('Attempting Cloudinary upload for profile picture'); 
         
         // upload each image to Cloudinary
         Promise.all(files.postImages.map(async(i)=>{
                console.log(i)
                var resultUpload = await dependencies.cloudinary.uploader.upload(i.path, {
                    folder: "user_posts",
                    resource_type: "auto",
                    timeout: 60000
                })
                
                var resultUrl = resultUpload.secure_url
    
                images.push(resultUrl)
                console.log('Cloudinary upload successful for post picture:',resultUrl);
            }
         )).then(async()=>{
            // Clean up temp profile picture file
            console.log("Cleaning up temp")
            files.postImages.forEach((i) =>fs.unlinkSync(i.path))

            
            return await updateDb()
        })
    }else{
        return await updateDb()
    }
     
 }
 
 const deletePost =(dependencies)=> async(postId,userId)=>{
     const postClient = dependencies.dbClient
     const postModel = postClient.postModel
 
     result = await postQuery.deletePost(postModel,postId,userId)
 
     if (!result){throw Error("User's post not found")}
 }
 
 const updatePost = async (postId)=>{
     
 }
 
 module.exports = {getPostPage, getUserPosts,addPost,deletePost}