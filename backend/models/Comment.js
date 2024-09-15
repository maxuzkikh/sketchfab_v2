// backend/models/comment.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Model3D = require('./model');

class Comment extends Model {}

Comment.init(
  {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
  }
);

// Associations
User.hasMany(Comment, { foreignKey: 'authorId' });
Comment.belongsTo(User, { foreignKey: 'authorId' });

Model3D.hasMany(Comment, { foreignKey: 'modelId' });
Comment.belongsTo(Model3D, { foreignKey: 'modelId' });

module.exports = Comment;
