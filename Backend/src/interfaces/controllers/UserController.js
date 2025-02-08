const RegisterUser = require('../../application/userCases/RegisterUser');

 class UserController{
    static async register(req,res){
        try{
            const {username, email, password } = req.body;

            // call the use case
            const registerUser = new RegisterUser();
            const user = await registerUser.execute({username, email, password});

            res.status(200).json({message:'User register successfully', data:user});
        }catch(err){
            res.status(400).json({message: err.message});

        }
    }
}
module.exports = UserController;