'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('available_times', {
      idavailable: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      day_of_week: {
        type: Sequelize.ENUM(
          "Satrday", "Sunday", "Monday", "Tuesday", "Wednsday", "Thursday"
        ),
        allowNull: false
      },
      from_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      to_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      user_iduser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'iduser'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('available_times', ['idavailable'], {
      name: 'idavailable_UNIQUE',
      unique: true
    });

    await queryInterface.addIndex('available_times', ['user_iduser'], {
      name: 'fk_available_user1_idx'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('available_times');
  }
};
