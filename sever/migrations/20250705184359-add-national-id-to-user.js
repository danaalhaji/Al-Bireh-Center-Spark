'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user', 'nationalId', {
      type: Sequelize.INTEGER,
      allowNull: false, 
      unique: true      
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user', 'nattionalId');
  }
};