class DeleteUser {
    async execute({ userDb, userId }) {
        const deletedUser = await userDb.findByIdAndDelete(userId);
        //check if the user to follow exsists 
        if (!deletedUser) {
            throw new Error('User not found');
        }
    }
}

module.exports = DeleteUser;