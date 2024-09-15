// backend/routes/models.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const upload = require('../config/multer');

const Model3D = require('../models/model');
const User = require('../models/user');

// Upload a new model
router.post('/', authenticate, upload.single('model'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const fileUrl = req.file.path;

    const newModel = await Model3D.create({
      title,
      description,
      fileUrl,
      ownerId: req.user,
    });

    res.status(201).json(newModel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all models
router.get('/', async (req, res) => {
  try {
    const models = await Model3D.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });
    res.json(models);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
