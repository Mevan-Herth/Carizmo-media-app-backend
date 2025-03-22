const SearchService = require("./mongdb/queries/search&discoverCases/SearchService") ;

class SearchController{
    constructor(dependencies){
        this.searchClient = dependencies.dbClient;
        this.UserModel = this.searchClient.UserModel;
    }
    async search(req,res){
        try{
            const {query} = req.query;

            const searchService = new SearchService();
            const result = await searchService.execute({dbclient:this.UserModel, query});

            res.json(result);
        }
        catch(err){
            res.status(500).json({success:false , message: err.message});
        }
    }
}

module.exports = SearchController;