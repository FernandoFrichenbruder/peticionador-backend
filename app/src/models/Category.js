const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db-connect');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categories',
  timestamps: true
});

module.exports = Category;