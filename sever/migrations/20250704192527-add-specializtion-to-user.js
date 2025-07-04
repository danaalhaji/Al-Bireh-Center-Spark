'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'specializtion_idspecializtion', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'specializtion',
        key: 'idspecializtion'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'specializtion_idspecializtion');
  }
};

