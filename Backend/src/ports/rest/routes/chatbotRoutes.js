const express = require('express');
const router = express.Router();
const Chatbot = require('../../../infrastructure/Chatbot')

router.get("/",async(req,res)=>{
    try{
        const {prompt} = req.body
        const response = await Chatbot.sendPrompt(prompt)
        res.status(200).json(response)
    }
    catch(error){
        return res.status(400).json({message:`${error}`})
    }
});

module.exports = router