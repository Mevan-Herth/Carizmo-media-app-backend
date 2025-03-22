
class SearchService {
    async execute({ dbclient, query }) {
        try {
            if (!query) {
                throw new Error("Search not found");
            }

            //Search for users 
            const users = await dbclient.find({
                $text: { $search: query }
            }).select("username").limit(10);

            return {
                success: true,
                message: "Search results fetched successfully",
                data: users
            };
        }
        catch (err) {
            throw new Error("Error fetching search result " + err.message);
        }

    }
}
module.exports = SearchService;