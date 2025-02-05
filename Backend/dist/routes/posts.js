const express = require("express");
const router = express.Router();  
const User = require("../../infrastructure/mongodb/models/Post.js");

router.get("/post/{id}", (req, res) => {
  res.send("Hey, it's the user route");
});
router.post("/add-post", (req, res) => {
  res.send("Hey, it's the user route");
});
router.delete("/delete-post", (req, res) => {
  res.send("Hey, it's the user route");
});

module.exports = router;