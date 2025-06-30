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
      primaryKey: true,
      references: {
        model: 'user',
        key: 'iduser'
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
          { name: "idinitial_assessment" },
          { name: "user_iduser" },
        ]
      },
      {
        name: "idinitial_assessment_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idinitial_assessment" },
        ]
      },
      {
        name: "fk_initial_assessment_user1_idx",
        using: "BTREE",
        fields: [
          { name: "user_iduser" },
        ]
      },
    ]
  });
};
