const fs = require('fs');
const path = require('path');
const { LoginUser, RegisterUser, UpdateUser, DeleteUser, LogoutUser, FollowUser, UserProfile } = require('../infrastructure/mongdb/queries/userCases');

class UserController {
    constructor(dependencies) {
        this.dependencies = dependencies;
        this.UserModel = dependencies.dbClient.UserModel;
        this.cloudinary = dependencies.cloudinary;
    }
    async register(req, res) {
        try {
            const { username, email, password } = req.body;

            // call the use case
            const registerUser = new RegisterUser();
            const { user, token } = await registerUser.execute({ userDb: this.UserModel, username, email, password });
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
            const result = logoutUser.execute({ userDb: this.UserModel });
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }


    async profile(req, res) {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "User not authenticated",
                });
            }

            // Assuming you're retrieving the user from the database using the userId
            const user = await this.UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            res.status(200).json({
                success: true,
                message: 'Profile fetched successfully.',
                user: user,  // Returning the user's data
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            // Authorization check
            if (req.userId !== id && !req.body.isAdmin) {
                return res.status(403).json({ message: "Unauthorized" });
            }

            if (req.files.profilePicture) {
                // Verify file exists
                if (!fs.existsSync(req.files.profilePicture[0].path)) {
                    throw new Error('Profile picture file not found');
                }
    
                console.log('Attempting Cloudinary upload for profile picture'); 
    
                // Upload profile picture to Cloudinary
                const resultProfile = await this.cloudinary.uploader.upload(req.files.profilePicture[0].path, {
                    folder: "user_profiles",
                    resource_type: "auto",
                    timeout: 60000
                });
    
                console.log('Cloudinary upload successful for profile picture:', resultProfile.secure_url);
    
                // Store the result in updateData
                updateData.profilePicture = resultProfile.secure_url;
    
                // Clean up temp profile picture file
                if (req.files.profilePicture[0].path && fs.existsSync(req.files.profilePicture[0].path)) {
                    fs.unlinkSync(req.files.profilePicture[0].path);
                }
            }
    
            // Handle cover picture upload
            if (req.files.coverPicture) {
                // Verify file exists
                if (!fs.existsSync(req.files.coverPicture[0].path)) {
                    throw new Error('Cover picture file not found');
                }
    
                console.log('Attempting Cloudinary upload for cover picture'); 
    
                // Upload cover picture to Cloudinary
                const resultCover = await this.cloudinary.uploader.upload(req.files.coverPicture[0].path, {
                    folder: "user_profiles",
                    resource_type: "auto",
                    timeout: 60000
                });
    
                console.log('Cloudinary upload successful for cover picture:', resultCover.secure_url);
    
                // Store the result in updateData
                updateData.coverPicture = resultCover.secure_url;
    
                // Clean up temp cover picture file
                if (req.files.coverPicture[0].path && fs.existsSync(req.files.coverPicture[0].path)) {
                    fs.unlinkSync(req.files.coverPicture[0].path);
                }
            }

            // Update user in database
            const updatedUser = await this.UserModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({message: "User updated successfully", data: updatedUser });

        } catch (error) {
            return res.status(500).json({message: "Internal server update error",error: error.message}); 
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            if (req.userId !== id && !req.body.isAdmin) {
                return res.status(403).json({ message: "You can only delete your own account." });
            }

            const deleteUser = new DeleteUser();
            const deletedUser = await deleteUser.execute({ userDb: this.UserModel, userId: id, })

            res.status(200).json({ message: "User deleted successfully!", deletedUser: deletedUser });

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    async followUser(req, res) {
        try {
            const { followerId, userIdToFollow } = req.body;

            const followUser = new FollowUser();
            const result = await followUser.execute(this.UserModel, followerId, userIdToFollow);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }


}
module.exports = UserController;