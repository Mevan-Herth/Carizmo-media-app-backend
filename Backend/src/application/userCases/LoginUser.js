const UserModel = require('../../infrastructure/database/models/UserModel');
const { generateToken } = require('../../infrastructure/services/authService')
const bcrypt = require('bcrypt');

class LoginUser {
    async execute({email, password }) {
        // check if user already exsits 
        const user = await UserModel.findOne({
            $or: [{ email: email }, { username: email }]
        });
        if (!user) {
            throw new Error('User not found!!!!')
        }

        //password validation
        const validatePassword = await bcrypt.compare(password, user.password)
        if (!validatePassword) {
            throw new Error('invalid password!!!!')
        }

        //genrate token
        const token = generateToken(user._id);
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
module.exports = LoginUser;