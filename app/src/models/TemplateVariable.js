const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect');
const Template = require('./template');
const Variable = require('./variable');

class TemplateVariable extends Sequelize.Model {}

TemplateVariable.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'TemplateVariable',
    tableName: 'template_variables',
    timestamps: true,
  }
);

Template.belongsToMany(Variable, {
  through: TemplateVariable,
  foreignKey: 'template_id',
});
Variable.belongsToMany(Template, {
  through: TemplateVariable,
  foreignKey: 'variable_id',
});

module.exports = TemplateVariable;