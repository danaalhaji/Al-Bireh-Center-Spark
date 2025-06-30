const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('session', {
    idsession: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    session_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    session_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    session_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    packeges_idpackeges: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'packeges',
        key: 'idpackeges'
      }
    },
    available_times_idavailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'available_times',
        key: 'idavailable'
      }
    },
    available_times_user_iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'available_times',
        key: 'user_iduser'
      }
    }
  }, {
    sequelize,
    tableName: 'session',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idsession" },
          { name: "packeges_idpackeges" },
          { name: "available_times_idavailable" },
          { name: "available_times_user_iduser" },
        ]
      },
      {
        name: "idsession_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idsession" },
        ]
      },
      {
        name: "fk_session_packeges1_idx",
        using: "BTREE",
        fields: [
          { name: "packeges_idpackeges" },
        ]
      },
      {
        name: "fk_session_available_times1_idx",
        using: "BTREE",
        fields: [
          { name: "available_times_idavailable" },
          { name: "available_times_user_iduser" },
        ]
      },
    ]
  });
};
