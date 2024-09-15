const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const upload = require('../config/multer');
const Model3D = require('../models/model');
const User = require('../models/user');
const path = require('path');

// Upload a new model
router.post('/', authenticate, upload.single('model'), async (req, res) => {
  try {
    // Ensure the file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded or unsupported file type!' });
    }

    const { title, description } = req.body;
    const login = req.user.username; // Assuming req.user contains login info

    // The file is saved under the uploads/login/product_title directory with the original name
    const fileUrl = path.join('uploads', login, title, req.file.originalname);

    // Save model information in the database
    const newModel = await Model3D.create({
      title,
      description,
      fileUrl,
      ownerId: req.user.id, // req.user set by the authenticate middleware
    });

    res.status(201).json(newModel);
  } catch (err) {
    console.error('Model upload error:', err);
    res.status(500).json({ error: 'Server error during model upload.' });
  }
});

module.exports = router;
