const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./ports/rest/routes/userRoutes');
const privPostRoutes = require('./ports/rest/routes/privatePostRoutes');
const pubPostRoutes = require('./ports/rest/routes/publicPostRoutes');
const userProfileRoutes = require('./ports/rest/routes/userProfileRoutes');
const commentRoutes = require('./ports/rest/routes/commentRoutes');
const searchRoute = require('./ports/rest/routes/searchRoute');
const {env, serverConfig, logger } = require('./config');
const connectDB = require("./infrastructure/mongdb/connection")
const {authMiddleware} = require('../src/shared/middlewares/authMiddleware');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET))

//connect to MongoDb
connectDB();


// public posts
app.use('/api/posts', pubPostRoutes);
app.use('/api/users', userRoutes);

//protected routes
app.use(authMiddleware);
app.use('/api/user-posts', privPostRoutes);
app.use('/api/users', userProfileRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/search-service',searchRoute);


// Start the server
app.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port}`);
});


