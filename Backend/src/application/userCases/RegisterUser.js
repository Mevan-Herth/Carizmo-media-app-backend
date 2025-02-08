const User = require('../../domain/User');
const UserModel = require('../../infrastructure/database/models/UserModel');

class RegisterUser{
    async execute({username, email, password}){
        // validate the inputs
        if(!username || !email || !password){
            throw new Error ('All fields are required!!!');
        }

        // check if user already exsits 
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            throw new Error('User alreadt exsits!!!')
        } 

        // // create a new user entity 
        // const user = new User({username,email,password});

        // save the user to the database
        const userModel = new UserModel({ username, email, password });
        await userModel.save();

        // return the user with out the password due to security resons i guess
        return {
            id: userModel._id,
            username: userModel.username,
            email: userModel.email,
        }
    }
}
module.exports = RegisterUser;