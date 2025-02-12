const { LoginUser, RegisterUser, UpdateUser, DeleteUser } = require('../../application/userCases');

class UserController {
    static async register(req, res) {
        try {
            const { username, email, password } = req.body;

            // call the use case
            const registerUser = new RegisterUser();
            const { user, token } = await registerUser.execute({ username, email, password });

            res.status(200).json({ message: 'User register successfully', data: { user, token } });
        } catch (err) {
            res.status(400).json({ message: err.message });

        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // call the use case
            const loginUser = new LoginUser();
            const { user, token } = await loginUser.execute({ email, password });

            res.status(200).json({ message: "Login successful!", data: { user, token } });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }


    static async profile(req, res) {
        res.json({
            success: true,
            message: 'You have access to this protected route.',
            userId: req.userId, // User ID from the token
        });
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            if (req.userId !== id && !req.body.isAdmin) {
                return res.status(403).json({ message: "You can only update your own account." });
            }
            // Call the use case to update the user
            const updateUser = new UpdateUser();
            const updatedUser = await updateUser.execute({ userId: id, updateData:updateData });

            res.status(200).json({ message: "User updated successfully!", data: updatedUser });

        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    static async deleteUser(req,res){
        try{
            const { id } = req.params;

            if (req.userId !== id && !req.body.isAdmin) {
                return res.status(403).json({ message: "You can only update your own account." });
            }

            const deleteUser = new DeleteUser();
            const deletedUser = await deleteUser.execute({ userId: id,})

            res.status(200).json({ message: "User deleted successfully!", deletedUser: deletedUser });

        }catch(err){
            res.status(400).json({ message: err.message });
        }
    }


}
module.exports = UserController;