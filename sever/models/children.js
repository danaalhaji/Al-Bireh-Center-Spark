const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes)  {
  const Child =  sequelize.define('children', {
    idchildren: {
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
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM(
        "Male", "Female"
      ),
      allowNull: false
    },
    parents_idparents: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: false,
      references: {
        model: 'parents',
        key: 'idparents'
      }
    },
    packeges_idpackeges: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: false,
      references: {
        model: 'packeges',
        key: 'idpackeges'
      }
    }
  }, {
    sequelize,
    tableName: 'children',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idchildren" },
          { name: "parents_idparents" },
        ]
      },
      {
        name: "idchildren_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idchildren" },
        ]
      },
      {
        name: "fk_children_parents_idx",
        using: "BTREE",
        fields: [
          { name: "parents_idparents" },
        ]
      }
    ]
  });

  return Child ;
};
