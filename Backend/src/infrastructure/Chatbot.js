const groqService = require('./services/groqService')

const sendPrompt = async(prompt)=>{
    return await groqService.getChatCompletion(prompt)
}

module.exports = {sendPrompt}