module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('template_variable', 'variableId', 'variable_id');
    await queryInterface.renameColumn('template_variable', 'templateId', 'template_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('template_variable', 'variable_id', 'variableId');
    await queryInterface.renameColumn('template_variable', 'template_id', 'templateId');
  }
};
