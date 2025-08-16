const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('initial_assessment', {
    idinitial_assessment: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    assement_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'iduser'
      }
    },
    specializtion_idspecializtion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'specializtion',
        key: 'idspecializtion'
      }
    }

  }, {
    sequelize,
    tableName: 'initial_assessment',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idinitial_assessment" }
        ]
      },
      {
        name: "fk_initial_assessment_user_idx",
        using: "BTREE",
        fields: [
          { name: "user_iduser" }
        ]
      },
      {
        name: "fk_initial_assessment_specializtion_idx",
        using: "BTREE",
        fields: [
          { name: "specializtion_idspecializtion" }
        ]
      }
    ]
  });
};
