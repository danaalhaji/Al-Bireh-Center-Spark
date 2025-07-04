module.exports = function(sequelize, DataTypes) {
  const Spec = sequelize.define('specializtion', {
    idspecializtion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    spe_type: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: {
        msg: "This specialization already exists!"
      }
    },
    is_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
        fields: [{ name: "idspecializtion" }]
      },
      {
        name: "idspecializtion_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [{ name: "idspecializtion" }]
      }
    ]
  });

  return Spec;
};