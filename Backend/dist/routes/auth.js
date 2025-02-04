const express = require("express");
const router = express.Router();
const User = require("../../infrastructure/mongodb/models/User.js");
const bcrypt = require("bcrypt");


//REGISTER
router.post("/register", async (req, res) => {

    try {

        //input data
        const { username, email, password } = req.body;

        // Validate input data
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists!" });
        }

        // should generate a new hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        //create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

//LOGIN

module.exports = router;
