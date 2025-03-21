const bcrypt = require('bcrypt');

class UpdateUser {
    async execute({userDb, userId, updateData }) {
         // If updating password, hash it first
         if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        //update data
        const user = await userDb.findByIdAndUpdate(userId,updateData,{
            runValidators: true
        });
        if (!user) {
            throw new Error('User not found');
        }
        //save the update user
        return user;
    }
}  
module.exports = UpdateUser;