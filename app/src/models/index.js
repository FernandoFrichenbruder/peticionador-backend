'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect');
const basename = path.basename(__filename);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Category = require("./Category");
db.Template = require("./Template");
db.Variable = require("./Variable");


db.Category.belongsToMany(db.Template, {
  through: "category_template",
  as: "TemplateCategory",
  foreignKey: "category_id",
});

db.Category.belongsToMany(db.Category, {
  through: "category_hierarchy",
  as: "ParentCategory",
  foreignKey: "child_category_id",
  otherKey: "parent_category_id",
});

db.Category.belongsToMany(db.Category, {
  through: "category_hierarchy",
  as: "ChildCategory",
  foreignKey: "parent_category_id",
  otherKey: "child_category_id",
});

db.Template.belongsToMany(db.Category, {
  through: "category_template",
  as: "CategoryTemplate",
  foreignKey: "template_id",
});

// db.Template.belongsToMany(db.Variable, {
//   through: "template_variable",
//   as: "VariableTemplate",
//   foreignKey: "template_id",
// });

// db.Variable.belongsToMany(db.Template, {
//   through: "template_variable",
//   as: "TemplateVariable",
//   foreignKey: "variable_id",
// });


module.exports = db;
