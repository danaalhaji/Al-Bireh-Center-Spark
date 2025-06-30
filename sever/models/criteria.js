const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('criteria', {
    idcriteria: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    criteria: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "criteria_UNIQUE"
    },
    children_idchildren: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'children',
        key: 'idchildren'
      }
    },
    children_partents_idpartents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'children',
        key: 'partents_idpartents'
      }
    },
    children_packeges_idpackeges: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'children',
        key: 'packeges_idpackeges'
      }
    },
    children_initial_assessment_idinitial_assessment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'children',
        key: 'initial_assessment_idinitial_assessment'
      }
    },
    children_initial_assessment_user_iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'children',
        key: 'initial_assessment_user_iduser'
      }
    }
  }, {
    sequelize,
    tableName: 'criteria',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idcriteria" },
          { name: "children_idchildren" },
          { name: "children_partents_idpartents" },
          { name: "children_packeges_idpackeges" },
          { name: "children_initial_assessment_idinitial_assessment" },
          { name: "children_initial_assessment_user_iduser" },
        ]
      },
      {
        name: "criteria_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "criteria" },
        ]
      },
      {
        name: "fk_criteria_children1_idx",
        using: "BTREE",
        fields: [
          { name: "children_idchildren" },
          { name: "children_partents_idpartents" },
          { name: "children_packeges_idpackeges" },
          { name: "children_initial_assessment_idinitial_assessment" },
          { name: "children_initial_assessment_user_iduser" },
        ]
      },
    ]
  });
};
