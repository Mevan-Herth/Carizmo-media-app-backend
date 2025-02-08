const UserModel = require('../../infrastructure/database/models/UserModel');
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
    }
}
module.exports = LoginUser;