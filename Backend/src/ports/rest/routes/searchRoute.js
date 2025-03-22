const express = require('express');
const SearchController = require('../../../infrastructure/SearchController');
const dependencies = require('../../../infrastructure/dependencies/dependencies');


const searchController = new SearchController(dependencies);

const router = express.Router();    

router.get('/search', searchController.search.bind(searchController));

module.exports =router;