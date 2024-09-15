// backend/index.js

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const modelRoutes = require('./routes/models');
const commentRoutes = require('./routes/comments');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/comments', commentRoutes);

// Sync Database
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
