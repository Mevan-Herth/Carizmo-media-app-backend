const UserModel = require('../../infrastructure/database/models/UserModel');
const { generateToken } = require('../../infrastructure/services/authService');

class LogoutUser {
    async execute() {
        try{
           
            return { success: true, message: 'Logged out successfully' };
        }
        catch (err){
            throw new Error('Error logging out: ' + error.message);
        }
       
    }
}
module.exports = LogoutUser;