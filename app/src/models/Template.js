const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/db-connect');

  class Template extends Model {
    static associate(models) {
      models.Template.belongsToMany(models.Category, {
        through: "category_template",
        as: "CategoryTemplate",
        foreignKey: "template_id",
      });

      models.Template.belongsToMany(models.Template, {
        through: "template_hierarchy",
        as: "ParentTemplate",
        foreignKey: "child_template_id",
        otherKey: "parent_template_id",
      });
      
      models.Template.belongsToMany(models.Template, {
        through: "template_hierarchy",
        as: "ChildTemplate",
        foreignKey: "parent_template_id",
        otherKey: "child_template_id",
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
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Template',
    tableName: 'templates',
    timestamps: true,
  });

  module.exports = Template;