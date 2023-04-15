const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/db-connect');

class Category extends Model {
  static associate(models) {
    models.Category.belongsToMany(models.Template, {
      through: "category_template",
      as: "TemplateCategory",
      foreignKey: "category_id",
    });
    
    models.Category.belongsToMany(models.Category, {
      through: "category_hierarchy",
      as: "ParentCategory",
      foreignKey: "child_category_id",
      otherKey: "parent_category_id",
    });
    
    models.Category.belongsToMany(models.Category, {
      through: "category_hierarchy",
      as: "ChildCategory",
      foreignKey: "parent_category_id",
      otherKey: "child_category_id",
    });
  }
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
  }
);

module.exports = Category;
