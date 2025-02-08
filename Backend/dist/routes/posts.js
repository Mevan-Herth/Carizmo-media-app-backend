import {getPost} from ("../../infrastructure/posts.js")
const express = require("express");
const router = express.Router();  
const Post = require("../../infrastructure/mongodb/models/Post.js");

router.get("/post/:id", async (req, res) => {
  const post = await getPost(req.params.id);
  if (!post) return res.status(400).statusMessage("Post not found")

  res.status(200).json(post)
});

router.post("/add-post", (req, res) => {
  
});
router.delete("/delete-post", (req, res) => {
  res.send("Hey, it's the user route");
});

module.exports = router;