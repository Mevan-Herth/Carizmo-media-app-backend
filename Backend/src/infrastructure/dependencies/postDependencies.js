const {env} = require("../../config/env")
const postClient=require("../mongdb/PostDbClient")

const dependencies = {env,postClient}

module.exports =  dependencies