// backend/routes/comments.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

const Comment = require('../models/comment');
const User = require('../models/user');

// Add a comment
router.post('/:modelId', authenticate, async (req, res) => {
  try {
    const { text } = req.body;
    const { modelId } = req.params;

    const newComment = await Comment.create({
      text,
      authorId: req.user,
      modelId,
    });

    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get comments for a model
router.get('/:modelId', async (req, res) => {
  try {
    const { modelId } = req.params;
    const comments = await Comment.findAll({
      where: { modelId },
      include: [{ model: User, attributes: ['username'] }],
    });
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
