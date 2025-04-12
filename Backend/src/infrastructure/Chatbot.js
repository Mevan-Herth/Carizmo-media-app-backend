const groqService = require('./services/groqService')
const chatOpts = require('../controller/chatTextOptions')

const sendPrompt = async(prompt)=>{
    return await groqService.getChatCompletion(prompt)
}

const getQueries = async()=>{
    return await chatOpts
}

module.exports = {sendPrompt}