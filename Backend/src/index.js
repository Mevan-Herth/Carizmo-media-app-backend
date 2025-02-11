const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./interfaces/routes/userRoutes');
const postRoutes = require('./interfaces/routes/postRoutes');
const { connectDB, env, serverConfig, logger } = require('./config');


dotenv.config();

const app = express();
app.use(express.json());

//connect to MongoDb
connectDB();


// use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Start the server
app.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port}`);
});


