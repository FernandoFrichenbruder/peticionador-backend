const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/db-connect');

class Category extends Model {
  static associate(models) {
    this.belongsToMany(models.Template, {
      through: 'Category_Template',
      as: 'templates',
      foreignKey: 'categoryId',
      otherKey: 'templateId',
    });

    this.belongsToMany(models.Category, {
      through: 'Category_Hierarchy',
      as: 'ParentCategories',
      foreignKey: 'child_category_id',
    });

    this.belongsToMany(models.Category, {
      through: 'Category_Hierarchy',
      as: 'ChildCategories',
      foreignKey: 'parent_category_id',
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
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
  }
);

module.exports = Category;
