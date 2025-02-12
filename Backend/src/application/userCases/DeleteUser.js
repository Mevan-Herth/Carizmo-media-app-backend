const UserModel = require('../../infrastructure/database/models/UserModel');

class DeleteUser {
    async execute({ userId }) {
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        // return { message: "User deleted successfully", userId: deletedUser._id };
    }
}

module.exports = DeleteUser;