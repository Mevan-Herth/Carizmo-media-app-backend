const {env,cloudinary} = require("../../config")
const dbClient=require("../mongdb/mongoDbClient")

const dependencies = {env,dbClient,cloudinary}

module.exports =  dependencies