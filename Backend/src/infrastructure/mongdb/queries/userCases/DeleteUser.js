class DeleteUser {
    async execute({ userDb, userId }) {
        const deletedUser = await userDb.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        // return { message: "User deleted successfully", userId: deletedUser._id };
    }
}

module.exports = DeleteUser;