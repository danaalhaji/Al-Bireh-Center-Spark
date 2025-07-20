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
      type: DataTypes.STRING(45),
      allowNull: false
    },
    partents_idparents: {
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
    },
    initial_assessment_idinitial_assessment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: false,
      references: {
        model: 'initial_assessment',
        key: 'idinitial_assessment'
      }
    },
    initial_assessment_user_iduser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: false,
      references: {
        model: 'initial_assessment',
        key: 'user_iduser'
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
          { name: "packeges_idpackeges" },
          { name: "initial_assessment_idinitial_assessment" },
          { name: "initial_assessment_user_iduser" },
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
      },
      {
        name: "fk_children_packeges1_idx",
        using: "BTREE",
        fields: [
          { name: "packeges_idpackeges" },
        ]
      },
      {
        name: "fk_children_initial_assessment1_idx",
        using: "BTREE",
        fields: [
          { name: "initial_assessment_idinitial_assessment" },
          { name: "initial_assessment_user_iduser" },
        ]
      },
    ]
  });
  return Child ;
};
