const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('specializtion', {
    idspecializtion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    spe_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    is_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    initial_assessment_idinitial_assessment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'initial_assessment',
        key: 'idinitial_assessment'
      }
    },
    initial_assessment_user_iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'initial_assessment',
        key: 'user_iduser'
      }
    }
  }, {
    sequelize,
    tableName: 'specializtion',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idspecializtion" },
          { name: "initial_assessment_idinitial_assessment" },
          { name: "initial_assessment_user_iduser" },
        ]
      },
      {
        name: "idspecializtion_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idspecializtion" },
        ]
      },
      {
        name: "fk_specializtion_initial_assessment1_idx",
        using: "BTREE",
        fields: [
          { name: "initial_assessment_idinitial_assessment" },
          { name: "initial_assessment_user_iduser" },
        ]
      },
    ]
  });
};
