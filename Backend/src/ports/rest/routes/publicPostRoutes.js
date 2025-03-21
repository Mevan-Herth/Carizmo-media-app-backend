const express = require("express");
const router = express.Router();  
const Post = require("../../../infrastructure/Posts")
const postDependencies = require("../../../infrastructure/dependencies/dependencies")

router.get("/post-detail/:id", async(req, res) => {
    try{
        const post = await Post.getPostPage(postDependencies)(req.params.id);
        res.status(200).json(post)
    }catch(error){
        res.status(400).json({message:error.message})
    }
});

module.exports = router;