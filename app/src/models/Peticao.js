'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Peticoes extends Model {}

  Peticoes.init({
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
  }, {
    sequelize,
    modelName: 'Peticoes',
    tableName: 'peticoes',
    timestamps: true,
  });

  return Peticoes;
};
