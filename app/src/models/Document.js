const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/db-connect');

class Document extends Model {}

Document.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Document',
  tableName: 'documents',
  timestamps: true,
});

module.exports = Document;
