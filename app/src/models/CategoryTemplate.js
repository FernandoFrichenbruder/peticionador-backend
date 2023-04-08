const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db-connect');
const Category = require('./Category');
const Template = require('./Template');

class CategoryTemplate extends Model {}

CategoryTemplate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'CategoryTemplate',
    tableName: 'category_template',
    timestamps: true,
  }
);

Category.belongsToMany(Template, { through: CategoryTemplate });
Template.belongsToMany(Category, { through: CategoryTemplate });

module.exports = CategoryTemplate;
