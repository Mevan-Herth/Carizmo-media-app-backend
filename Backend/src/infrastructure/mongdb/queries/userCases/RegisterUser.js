const UserModel = require('../../models/UserModel');
const { generateToken } = require('../../../services/authService');

class RegisterUser {
    async execute({ username, email, password }) {
        // validate the inputs
        if (!username || !email || !password) {
            throw new Error('All fields are required!!!');
        }

        // check if user already exsits 
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error('User alreadt exsits!!!')
        }

        // // create a new user entity 
        // const user = new User({username,email,password});


        // save the user to the database
        // Create and save the user
        const user = new UserModel({ username, email, password });
        await user.save();


        //generate the user token 
        const token = generateToken(user._id);

        // return the user with out the password due to security resons i guess
        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        };
        
    }
}
module.exports = RegisterUser;