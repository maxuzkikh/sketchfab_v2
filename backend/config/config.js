// backend/config/config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1235',
    database: process.env.DB_NAME || 'sketchfab_clone',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
};
