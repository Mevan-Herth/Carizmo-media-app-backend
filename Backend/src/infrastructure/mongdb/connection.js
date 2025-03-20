
const mongoose = require('mongoose');
const env = require('../../config/env'); // Load environment variables

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;