const Post = require('../infrastructure/Posts');

class AiOptInterface{
    constructor(fn){
        this.query = ''
        this.fn = fn
    }

    execute(...args){
        this.query = this.fn(...args)
    }

    async asyncExeute(...args){
        this.query = await this.fn(...args)
    }
    
    get getQuery(){return this.query}
}

const q1 = new AiOptInterface(async ()=>{
    const recent = await Post.getMultiplePosts(1)
    q = "from these conversational posts, what is the average conversation topic:\n"

    // recent.forEach(post => {
    //     let appendContent = {"title":post["title"],
    //         "content":post["mainText"]}
    //     return `${appendContent},`
    // });
})

q1.asyncExeute()


const chatOpts = {
    "trending":q1.getQuery
}

module.exports = chatOpts