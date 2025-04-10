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

router.get("/home", async (req, res) => {
    try {
      const {page} = req.query; // Default to page 1 and limit 10
      console.log(page)
      const posts = await Post.getMultiplePosts(postDependencies)(parseInt(page));
      // res.cookie('postPage', token, {
      //   httpOnly: true,
      //   signed: true,
      //   secure: true,
      //   sameSite: 'none',
      // });
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error in /home route:", error);
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;