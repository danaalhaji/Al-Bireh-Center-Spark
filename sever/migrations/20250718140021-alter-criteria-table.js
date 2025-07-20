'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('criteria',{ 
      idcriteria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      description: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      children_idchildren: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'children',
          key: 'idchildren'
        }
      }
    }, {
      tableName: 'criteria',
      timestamps: true
    });


    await queryInterface.addIndex('criteria', ['idcriteria'], {
        name: 'idcriteria_UNIQUE',
        unique: true
    });
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('criteria', 'children_idchildren');
    await queryInterface.dropTable('criteria');

  }
};
