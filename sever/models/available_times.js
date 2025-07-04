const Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('available_times', {
    idavailable: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    is_booked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    day_of_week: {
      type: DataTypes.DATE,
      allowNull: false
    },
    from_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    to_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'iduser'
      }
    }
  }, {
    sequelize,
    tableName: 'available_times',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idavailable" },
          { name: "user_iduser" },
        ]
      },
      {
        name: "idavailable_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idavailable" },
        ]
      },
      {
        name: "fk_available_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_iduser" },
        ]
      },
    ]
  });
};
