const multer = require('multer');
 const path = require('path');
 const fs = require('fs');
 
 // Configure storage
 const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     const uploadDir = path.join(__dirname, '../../tmp');
     if (!fs.existsSync(uploadDir)) {
       fs.mkdirSync(uploadDir, { recursive: true });
     }
     cb(null, uploadDir);
   },
   filename: (req, file, cb) => {
     const ext = path.extname(file.originalname);
     const uniqueName = `post-${Date.now()}${ext}`;
     cb(null, uniqueName);
   }
 });
 
 // File filter
 const fileFilter = (req, file, cb) => {
   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
   if (allowedTypes.includes(file.mimetype)) {
     cb(null, true);
   } else {
     cb(new Error('InvalidFileType'), false);
   }
 };
 
 module.exports = multer({
   storage,
   fileFilter,
   limits: {
     fileSize: 2*1024 * 1024 * 1024 // 2GB
   }
 }).fields([{ name: 'postImages', maxCount: 5 }]); 