'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('category_template', 'category_ID', 'category_id');
    await queryInterface.renameColumn('category_template', 'template_ID', 'template_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('category_template', 'category_id', 'category_ID');
    await queryInterface.renameColumn('category_template', 'template_id', 'template_ID');
  }
};
