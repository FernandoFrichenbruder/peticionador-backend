const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/db-connect');

  class Template extends Model {
    static associate(models) {
      models.Template.belongsToMany(models.Category, {
        through: "category_template",
        as: "CategoryTemplate",
        foreignKey: "template_id",
      });
    }
  }
  Template.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    modelName: 'Template',
    tableName: 'templates',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  module.exports = Template;