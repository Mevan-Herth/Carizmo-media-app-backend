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
    const postClient = dependencies.dbClient
    const postModel = postClient.postModel

    // posts = await postModel.find
}

const getMultiplePosts = (dependencies) => async (page = 1, userId=null) => {
    const postClient = dependencies.dbClient;
    const postModel = postClient.postModel;

    // Adjust page for 0-based indexing
    const pageIndex = page > 0 ? page - 1 : 0; // Ensures no negative pages

    try {
        // Assuming getMultPost is handling pagination based on `pageIndex` and `limit`
        const posts = await postQuery.getMultPost(postModel, pageIndex, userId);

        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to retrieve posts");
    }
};

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
            "votedUsers": [], 
            "images":images
        }

        const result = await postQuery.addPost(postModel,postObj)
        return result
    }

    //image
    if (files&&'postImages' in files) {
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
const votePost = (dependencies) => async (postId, userId, voteType) => {
    const postClient = dependencies.dbClient
    const postModel = postClient.postModel;

    // Ensure the vote type is valid
    if (!['up', 'down'].includes(voteType)) {
        throw new Error("Invalid vote type. Must be 'up' or 'down'.");
    }

    // Fetch the post from the database
    const post = await postModel.findById(postId);
    if (!post) throw new Error("Post not found");

    // Ensure the votes array exists
    if (!post.votes) {
        post.votes = [];  // Initialize an empty array if votes doesn't exist
    }

    // Check if the user has already voted
    const existingVote = post.votes.find(v => v.userId.toString() === userId.toString());
    let voteChange = 0;

    if (existingVote) {
        // If the user has already voted
        if (existingVote.vote === 1 && voteType === 'up') {
            throw new Error("Already upvoted");
        } else if (existingVote.vote === -1 && voteType === 'down') {
            throw new Error("Already downvoted");
        } else if (existingVote.vote !== (voteType === 'up' ? 1 : -1)) {
            // Switch the vote type
            voteChange = voteType === 'up' ? 2 : -2;

            await postModel.updateOne(
                { _id: postId, "votes.userId": userId },
                { $set: { "votes.$.vote": voteType === 'up' ? 1 : -1 }, $inc: { likes: voteChange } }
            );
        }
    } else {
        // If the user hasn't voted yet, add the vote
        voteChange = voteType === 'up' ? 1 : -1;
        await postModel.updateOne(
            { _id: postId },
            {
                $push: { votes: { userId, vote: voteType === 'up' ? 1 : -1 } },
                $inc: { likes: voteChange }
            }
        );
    }

    return { message: "Vote processed successfully", voteChange };
};
const updatePost = async (postId)=>{
    
}

module.exports = {getPostPage, getUserPosts,addPost,deletePost,getMultiplePosts, votePost}