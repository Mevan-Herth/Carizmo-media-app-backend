const UserModel = require('../../infrastructure/database/models/UserModel');

class FollowUser {
    async execute(followerId, userIdtoFollow){
        try{
            //check if the user to follow exsists 
            const userToFollow = await UserModel.findById(userIdtoFollow);
            if(!userToFollow){
                throw new Error('User to follow not found');
            }

            //ceck if follwer exsists
            const follower = await UserModel.findById(followerId);
            if(!follower){
                throw new Error('Follower not found');
            }

            //check if the user is already following the user
            if(follower.following.includes(userIdtoFollow)){
                return {message:'You are already following this user'};
            }

            //add the user to the followers following list
            follower.following.push(userIdtoFollow);
            await follower.save();
            
            // add the folllower to the users followers list
            userToFollow.followers.push(followerId);
            await userToFollow.save();

            return {message: 'User followed successfully' };
        }
        catch(err){
            throw new Error('Error following user: ' + error.message);
        }
    }
}
module.exports = FollowUser;