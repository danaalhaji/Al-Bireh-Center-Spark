const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Criteria = sequelize.define('criteria', {
    idcriteria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    score:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    children_idchildren: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'children',
        key: 'idchildren'
      }
    }
  }, {
    tableName: 'criteria',
    timestamps: false
  });

  Criteria.associate = (models) => {
    Criteria.belongsTo(models.children, {
      foreignKey: 'children_idchildren',
      as: 'child'
    });
  };

  return Criteria;
};
