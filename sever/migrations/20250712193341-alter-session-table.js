'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('session', {
    idsession: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    session_number: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    session_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    session_time: {
      type: Sequelize.DATE,
      allowNull: false
    },is_booked:{
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    is_done: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    packeges_idpackeges: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'packeges',
          key: 'idpackeges'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    available_times_idavailable: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'available_times',
          key: 'idavailable'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      available_times_user_iduser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'available_times',
          key: 'user_iduser'
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
      await queryInterface.addIndex('session', ['idsession'], {
      name: 'idsession_UNIQUE',
      unique: true
    });
    await queryInterface.addIndex('session', ['available_times_idavailable', 'available_times_user_iduser'], {
      name: 'fk_session_available_times1_idx'
    });

    await queryInterface.addIndex('session', ['packeges_idpackeges'], {
      name: 'fk_session_packeges1_idx'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('session');
  }
};
