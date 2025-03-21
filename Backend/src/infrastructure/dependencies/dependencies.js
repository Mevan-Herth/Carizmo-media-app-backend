const {env} = require("../../config/env")
const postClient=require("../mongdb/mongoDbClient")

const dependencies = {env,postClient}

module.exports =  dependencies