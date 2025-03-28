const Groq = require("groq-sdk");
const env = require('../../config/env'); 

const groq = new Groq({
    apiKey: env.GROQ_API_KEY
});


const getChatCompletion = async (prompt) => {
    const result = await groq.chat.completions.create({
        messages: [{
            role: "user",
            content: prompt
        }],
        model: "llama-3.3-70b-versatile"
    });
    return result;
};

// const main = async () => {
//     const result = await getChatCompletion();
//     console.log(result.choices[0]?.message?.content || "");
// }

module.exports = {getChatCompletion}