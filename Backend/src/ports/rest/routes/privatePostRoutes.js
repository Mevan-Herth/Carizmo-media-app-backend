const express = require("express");
const router = express.Router(); 
const Post = require("../../../infrastructure/Posts")
 const postDependencies = require("../../../infrastructure/dependencies/dependencies")
 const uploadImage = require("../../../shared/middlewares/postImageMiddleware")


router.post("/add-post",uploadImage, async (req, res) => {
  const {title, content} = req.body
  try {
    const result = await Post.addPost(postDependencies)(title,content,req.userId,req.files)
    return res.status(200).json({message:`Post added ${result}`})
    }
  catch(error) {return res.status(400).json({message:`${error}`})}
});

router.delete("/delete-post/:id", async (req, res) => {
  try{

    await Post.deletePost(postDependencies)(req.params.id,req.userId)
    res.status(200).json({message:"Post successfully delete"})
  }
  catch(error){
    res.status(400).json({message:`${error}`})
  }

});

router.patch("/edit-post/:id", async (req,res)=>{

});

router.get("/all",async(req,res)=>{
  try {
    const {page} = req.query; // Default to page 1 and limit 10
    console.log(page)
    const posts = await Post.getMultiplePosts(postDependencies)(parseInt(page),req.userId);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in /home route:", error);
    res.status(400).json({ message: error.message });
  }
});


router.post('/vote', async (req, res) => {
  const { postId, voteType } = req.body;
  const userId = req.userId; 

  try {
    const result = await Post.votePost(postDependencies)(postId, userId, voteType);
    res.status(200).json(result);
  } catch (err) {
    console.error("Vote error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// router.addComment("/add-comment/:postId",async(req,res)=>{

// })

module.exports = router;