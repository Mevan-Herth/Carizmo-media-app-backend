const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./interfaces/routes/userRoutes');
const postRoutes = require('./interfaces/routes/postRoutes');
const userProfileRoutes = require('./interfaces/routes/userProfileRoutes');
<<<<<<< HEAD
const commentRoutes = require('./interfaces/routes/CommentRoutes'); 
const postRoutes = require('./interfaces/routes/postRoutes');
=======
>>>>>>> parent of fceb0f2 (Merge remote-tracking branch 'origin/Omar')
const { connectDB, env, serverConfig, logger } = require('./config');
const {} = require('./application/userCases');
const {authMiddleware} = require('../src/shared/middlewares/authMiddleware');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET))

//connect to MongoDb
connectDB();


// use routes
app.use('/api/users', userRoutes);
//protected routes
app.use(authMiddleware);
app.use('/api/posts', postRoutes);
app.use('/api/users', userProfileRoutes);
app.use('/api/posts',postRoutes)


// Start the server
app.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port}`);
});


