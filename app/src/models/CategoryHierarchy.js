const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db-connect');
const Category = require('./Category');

class CategoryHierarchy extends Model {}

CategoryHierarchy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    parent_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id',
      },
    },
    child_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'CategoryHierarchy',
    tableName: 'category_hierarchy',
    timestamps: true,
  }
);

Category.belongsToMany(Category, { through: CategoryHierarchy, as: "ParentCategories" });
Category.belongsToMany(Category, { through: CategoryHierarchy, as: "ChildCategories" });

module.exports = CategoryHierarchy;
