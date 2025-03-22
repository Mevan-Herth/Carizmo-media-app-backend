class LogoutUser {
    async execute({userDb}) {
        try{
           
            return { success: true, message: 'Logged out successfully' };
        }
        catch (err){
            throw new Error('Error logging out: ' + error.message);
        }
       
    }
}
module.exports = LogoutUser;