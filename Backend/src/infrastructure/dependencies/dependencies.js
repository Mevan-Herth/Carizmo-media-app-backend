const {env,cloudinary,server} = require("../../config")
const dbClient=require("../mongdb/mongoDbClient")

const dependencies = {env,dbClient,cloudinary,server}

module.exports =  dependencies