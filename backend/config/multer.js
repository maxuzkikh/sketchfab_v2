const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      // Ensure req.user and req.body are defined
      if (!req.user || !req.user.username) {
        throw new Error('User not authenticated: req.user or req.user.username is undefined.');
      }
      if (!req.body || !req.body.title) {
        throw new Error('Product title is missing: req.body.title is undefined.');
      }

      const login = req.user.username; // Assuming login is the username from req.user
      const productTitle = req.body.title;

      // Log values to debug
      console.log('Login:', login);
      console.log('Product Title:', productTitle);

      // Define the folder path
      const folderPath = path.join('uploads', login, productTitle);

      // Create the folder if it doesn't exist
      fs.mkdirSync(folderPath, { recursive: true });

      cb(null, folderPath); // Use this folder for storing files
    } catch (error) {
      console.error('Error in destination function:', error.message);
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    // Keep the original file name
    cb(null, file.originalname);
  },
});

// File filter to allow only .zip, .gltf, .glb
const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (['.zip', '.gltf', '.glb'].includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type! Only ZIP, GLTF, and GLB files are allowed.'), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

module.exports = upload;
