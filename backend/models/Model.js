// backend/models/model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class Model3D extends Model {}

Model3D.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Model3D',
    timestamps: true,
  }
);

// Associations
User.hasMany(Model3D, { foreignKey: 'ownerId' });
Model3D.belongsTo(User, { foreignKey: 'ownerId' });

module.exports = Model3D;
