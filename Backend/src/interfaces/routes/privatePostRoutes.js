const express = require("express");
const router = express.Router();  
<<<<<<< Updated upstream:Backend/src/interfaces/routes/privatePostRoutes.js
const Post = require("../controllers/Posts")
=======
const Post = require("../../../infrastructure/Posts")
const postDependencies = require("../../../infrastructure/dependencies/dependencies")
const uploadImage = require("../../../shared/middlewares/postImageMiddleware")
>>>>>>> Stashed changes:Backend/src/ports/rest/routes/privatePostRoutes.js


router.post("/add-post",uploadImage, async (req, res) => {
  const {title, content} = req.body
  try {
<<<<<<< Updated upstream:Backend/src/interfaces/routes/privatePostRoutes.js
    const result = await Post.addPost(title,content,req.userId)
=======
    const result = await Post.addPost(postDependencies)(title,content,req.userId,req.files)
>>>>>>> Stashed changes:Backend/src/ports/rest/routes/privatePostRoutes.js
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

router.patch("/edit-post/:id", async (req,res)=>{

});


// router.addComment("/add-comment/:postId",async(req,res)=>{

// })

module.exports = router;