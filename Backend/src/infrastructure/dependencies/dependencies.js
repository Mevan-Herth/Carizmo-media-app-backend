const {env} = require("../../config/env")
const dbClient=require("../mongdb/mongoDbClient")

const dependencies = {env,dbClient}

module.exports =  dependencies