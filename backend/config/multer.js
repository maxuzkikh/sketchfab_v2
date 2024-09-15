// backend/config/multer.js
const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/models/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /glb|gltf|obj|fbx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extname) {
    cb(null, true);
  } else {
    cb('Error: Unsupported file type!');
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
