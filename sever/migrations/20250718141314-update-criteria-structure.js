'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.removeColumn('criteria', 'score');
    await queryInterface.removeColumn('criteria', 'criteria'); // عمود autoIncrement قديم
    await queryInterface.removeColumn('criteria', 'children_partents_idpartents');
    await queryInterface.removeColumn('criteria', 'children_packeges_idpackeges');
    await queryInterface.removeColumn('criteria', 'children_initial_assessment_idinitial_assessment');
    await queryInterface.removeColumn('criteria', 'children_initial_assessment_user_iduser');


    await queryInterface.changeColumn('criteria', 'idcriteria', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });

    await queryInterface.addColumn('criteria', 'name', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });
    await queryInterface.addColumn('criteria', 'description', {
      type: Sequelize.STRING(200),
      allowNull: true,
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.addColumn('criteria', 'score', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn('criteria', 'criteria', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    });
    await queryInterface.addColumn('criteria', 'children_partents_idpartents', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'children',
        key: 'partents_idpartents'
      }
    });
    await queryInterface.addColumn('criteria', 'children_packeges_idpackeges', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'children',
        key: 'packeges_idpackeges'
      }
    });
    await queryInterface.addColumn('criteria', 'children_initial_assessment_idinitial_assessment', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'children',
        key: 'initial_assessment_idinitial_assessment'
      }
    });
    await queryInterface.addColumn('criteria', 'children_initial_assessment_user_iduser', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'children',
        key: 'initial_assessment_user_iduser'
      }
    });

    await queryInterface.changeColumn('criteria', 'idcriteria', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    });


    await queryInterface.removeColumn('criteria', 'name');
    await queryInterface.removeColumn('criteria', 'description');


    await queryInterface.addColumn('criteria', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('criteria', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  }
};
