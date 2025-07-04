'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('specializtion', 'user_iduser');

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('specializtion', 'user_iduser', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'iduser'
      }
    });
    
  }
};
