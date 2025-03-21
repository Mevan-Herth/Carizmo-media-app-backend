const bcrypt = require('bcrypt');
const { generateToken } = require('../../../services/authService'); // Assuming you have a generateToken function

class LoginUser {
    async execute({ userDb, email, password }) {
        // Check if user already exists
        const user = await userDb.findOne({
            $or: [{ email: email }, { username: email }]
        });
        if (!user) {
            throw new Error('User not found!');
        }

        // Validate the password
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            throw new Error('Invalid password!');
        }

        // Generate token
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
