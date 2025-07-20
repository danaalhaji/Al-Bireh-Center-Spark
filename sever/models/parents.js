const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Parent = sequelize.define('parents', {
    idparents: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    relationship: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "parent_id_UNIQUE"
    },
    uodated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'parents',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idparents" },
        ]
      },
      {
        name: "parent_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
      {
        name: "idparents_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idparents" },
        ]
      },
    ]
  });
  return Parent
};
