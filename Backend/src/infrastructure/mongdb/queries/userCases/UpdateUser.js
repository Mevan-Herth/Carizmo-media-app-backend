const bcrypt = require('bcrypt');

class UpdateUser {
  async execute({ userDb, userId, updateData }) {
    try {
      // If updating password, hash it first
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      // Update user in database
      const user = await userDb.findByIdAndUpdate(
        userId, 
        updateData, 
        {
          new: true,
          runValidators: true
        }
      );

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (err) {
      throw new Error('Error updating user: ' + err.message);
    }
  }
}

module.exports = UpdateUser;