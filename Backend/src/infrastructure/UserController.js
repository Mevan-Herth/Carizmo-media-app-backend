const { token } = require('morgan');
const { LoginUser, RegisterUser, UpdateUser, DeleteUser, LogoutUser, FollowUser } = require('../infrastructure/mongdb/queries/userCases');

class UserController {
    constructor(dependencies) {
        this.userClient = dependencies.dbClient;
        this.UserModel = this.userClient.UserModel;
    }
        async register(req, res) {
        try {
            const { username, email, password } = req.body;

            // call the use case
            const registerUser = new RegisterUser();
            const { user, token } = await registerUser.execute({userDb: this.UserModel, username, email, password });
            res.cookie('jwt', token, {
                httpOnly: true,  // Makes it inaccessible to JavaScript (important for security)
                signed: true,    // Signs the cookie to prevent tampering
                sameSite: 'None', // Important for cross-site cookies (useful for different origins in development)
                // secure: true,     // Use `true` for production (only over HTTPS)
                maxAge: 7 * 24 * 60 * 60 * 1000,  // Set expiration time (7 days)
            })

            res.status(200).json({ message: 'User register successfully', data: { user, token } });
        } catch (err) {
            res.status(400).json({ message: err.message });

        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
    
            // Call the LoginUser class to handle the login logic
            const loginUser = new LoginUser();
            const { user, token } = await loginUser.execute({ userDb: this.UserModel, email, password });
    
            // Set the JWT token as a cookie
            res.cookie('jwt', token, {
                httpOnly: true,
                signed: true,
                sameSite: 'None',
                maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
            });
    
            // Respond with the user data and token
            res.status(200).json({ message: 'Login successful', data: { user, token } });
        } catch (error) {
            res.status(400).json({ message: error.message }); // Return the error message from LoginUser class
        }
    }
    async LogoutUser(req, res) {
        try {
            const logoutUser = new LogoutUser();
            res.clearCookie('jwt', {
                httpOnly: true,
                signed: true,
                sameSite: 'None',
                // secure: true,
            })
            const result = logoutUser.execute({userDb: this.UserModel});
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }


    async profile(req, res) {
        res.json({
            success: true,
            message: 'You have access to this protected route.',
            userId: req.userId, // User ID from the token
        });
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            if (req.userId !== id && !req.body.isAdmin) {
                return res.status(403).json({ message: "You can only update your own account." });
            }
            // Call the use case to update the user
            const updateUser = new UpdateUser();
            const updatedUser = await updateUser.execute({userDb: this.UserModel, userId: id, updateData: updateData });

            res.status(200).json({ message: "User updated successfully!", data: updatedUser });

        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            if (req.userId !== id && !req.body.isAdmin) {
                return res.status(403).json({ message: "You can only delete your own account." });
            }

            const deleteUser = new DeleteUser();
            const deletedUser = await deleteUser.execute({userDb: this.UserModel, userId: id, })

            res.status(200).json({ message: "User deleted successfully!", deletedUser: deletedUser });

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    async followUser(req, res){
        try{
            const {followerId, userIdToFollow} = req.body;

            const followUser = new FollowUser();
            const result = await followUser.execute (this.UserModel, followerId, userIdToFollow);

            res.status(200).json(result);
        }catch(err){
            res.status(400).json({ message: err.message });
        }
    }


}
module.exports = UserController;