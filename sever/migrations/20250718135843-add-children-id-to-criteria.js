'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('criteria', 'children_idchildren', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'children', 
        key: 'idchildren'        
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('criteria', 'children_idchildren');
  }
};
