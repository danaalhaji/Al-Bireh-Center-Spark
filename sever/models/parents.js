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
      allowNull: false,
      validate: {
        is: {
          args: /^(?:\+?972|972|0)(5[0-9]{8})$/,
          msg: "Invalid phone number format.",
        }
      }
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: {
        msg: "This email is already in use",
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email must be a valid email'
        }
      }
    },
    notes: {
      type: DataTypes.STRING(45),
      allowNull: true
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
