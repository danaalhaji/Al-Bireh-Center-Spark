'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('partents', 'parents');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('parents', 'partents');
  }
};
