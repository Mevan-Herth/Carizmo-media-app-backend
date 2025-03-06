const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./interfaces/routes/userRoutes');
const userProfileRoutes = require('./interfaces/routes/userProfileRoutes');
const commentRoutes = require('./interfaces/routes/commentRoutes'); // Add this line
const postRoutes = require('./interfaces/routes/postRoutes'); // If you have post routes
const { connectDB, env, serverConfig, logger } = require('./config');
const {} = require('./application/userCases');
const {authMiddleware} = require('./shared/middlewares/authMiddleware')

dotenv.config();

const app = express();
app.use(express.json());

//connect to MongoDb
connectDB();

// use routes
app.use('/api/users', userRoutes);

//protected routes
app.use(authMiddleware);
app.use('/api/users', userProfileRoutes);
app.use('/api/comments', commentRoutes); // Add this line
// app.use('/api/posts', postRoutes); // Uncomment if you have post routes

// Start the server
app.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port}`);
});