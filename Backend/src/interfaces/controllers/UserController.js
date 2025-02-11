const {LoginUser,RegisterUser,} = require('../../application/userCases');

 class UserController{
    static async register(req,res){
        try{
            const {username, email, password } = req.body;

            // call the use case
            const registerUser = new RegisterUser();
            const { user, token } = await registerUser.execute({ username, email, password });

            res.status(200).json({message:'User register successfully', data:{user,token}});
        }catch(err){
            res.status(400).json({message: err.message});

        }
    }
    static async login(req,res){
        try{
            const { email, password } = req.body;

            // call the use case
            const loginUser = new LoginUser();
            const {user,token} = await loginUser.execute({email, password});

            res.status(200).json({ message: "Login successful!", data:{user,token}});
        }catch(err){
            res.status(400).json({message: err.message});
        }
    }


    static async profile(req,res){
        res.json({
            success: true,
            message: 'You have access to this protected route.',
            userId: req.userId, // User ID from the token
          });
    }

    
}
module.exports = UserController;