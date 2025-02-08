const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./interfaces/routes/userRoutes');
const { connectDB, env, serverConfig, logger } = require('./config');
const {} = require('./application/userCases');

dotenv.config();

const app = express();
app.use(express.json());

//connect to MongoDb
connectDB();


// use routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port}`);
});


