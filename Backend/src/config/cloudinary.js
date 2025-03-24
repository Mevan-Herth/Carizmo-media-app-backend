const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Verify required environment variables are present
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Missing Cloudinary configuration in environment variables');
}

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Test the configuration
cloudinary.api.ping()
  .then(() => console.log('Cloudinary connection successful'))
  .catch(err => console.error('Cloudinary connection failed:', err));

module.exports = cloudinary;