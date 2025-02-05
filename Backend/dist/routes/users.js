const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../infrastructure/mongodb/models/User.js");
const router = express.Router();

//UPDATE USER
router.put("/:id", async (req, res) => {
  try {

    // Check if the user is authorized to update the account
    if (req.body.userId === req.params.id || req.body.isAdmin) {

      //-----Optinal---------
      // // Restrict which fields can be updated 
      // const allowedUpdates = ["username", "email"];
      // const updates = Object.keys(req.body);
      // const isValidUpdate = updates.every((field) => allowedUpdates.includes(field));

      // if (!isValidUpdate) {
      //   return res.status(400).json({ message: "Invalid update fields" });
      // }
      //----------------------


      // If the password is being updated, hash the new password
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }


      // Update user information
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true   // Enforce schema validation
      });


      if (!updatedUser) {
        return res.status(404).json({ message: "User not found!" });
      }
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } else {
      res.status(403).json({ message: "You can only update your own account!" });
    }


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server updateUser error" });
  }
});

module.exports = router;