const express = require("express");
const router = express.Router();  
const Post = require("../controllers/Posts")

router.get("/post-detail/:id", async(req, res) => {
    const post = await Post.getPostPage(req.params.id);
    if (!post) return res.status(400).json({message:"Post not found"})

    res.status(200).json(post)
});

module.exports = router;