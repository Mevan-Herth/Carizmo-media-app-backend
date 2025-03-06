const express = require("express");
const router = express.Router();  
const Post = require("../controllers/Posts")

router.get("/post/:id", async (req, res) => {
  const post = await Post.getPostPage(req.params.id);
  if (!post) return res.status(400).json({message:"Post not found"})

  res.status(200).json(post)
});

router.post("/add-post", async (req, res) => {
  const {title, content} = req.body
  try {
    const result = await Post.addPost(title,content,req.userId)
    return res.status(200).json({message:`Post added ${result}`})
    }
  catch(error) {return res.status(400).json({message:`${error}`})}
});

router.delete("/delete-post/:id", async (req, res) => {
  try{

    await Post.deletePost(req.params.id,req.userId)
    res.status(200).json({message:"Post successfully delete"})
  }
  catch(error){
    res.status(400).json({message:`${error}`})
  }

});

router.get("/post-detail/:id", async(req, res) => {
  const post = await Post.getPostPage(req.params.id);
  if (!post) return res.status(400).json({message:"Post not found"})
});
// router.addComment("/add-comment/:postId",async(req,res)=>{

// })

module.exports = router;