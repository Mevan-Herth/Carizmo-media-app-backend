const {env} = require("../../config/env")
const Client=require("../mongdb/mongoDbClient")

const dependencies = {env,Client}

module.exports =  dependencies