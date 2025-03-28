const {env,cloudinary,server} = require("../../config")
const dbClient=require("../mongdb/mongoDbClient")

const dependencies = {env,dbClient,cloudinary,server}

const chatbotDependencies = {}

module.exports =  dependencies