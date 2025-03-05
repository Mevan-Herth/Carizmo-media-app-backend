const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./interfaces/routes/userRoutes');
const postRoutes = require('./interfaces/routes/postRoutes');
const userProfileRoutes = require('./interfaces/routes/userProfileRoutes');
const { connectDB, env, serverConfig, logger } = require('./config');
const {} = require('./application/userCases');
const {authMiddleware} = require('../src/shared/middlewares/authMiddleware')

dotenv.config();

const app = express();
app.use(express.json());

//connect to MongoDb
connectDB();


// use routes
app.use('/api/users', userRoutes);
//protected routes
app.use(authMiddleware);
app.use('/api/posts', postRoutes);
app.use('/api/users', userProfileRoutes);


// Start the server
app.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port}`);
});


