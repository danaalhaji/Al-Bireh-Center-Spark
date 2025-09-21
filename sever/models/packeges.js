const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Packages =  sequelize.define('packeges', {
    idpackeges: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    num_of_sessions: {
      type: DataTypes.INTEGER,
      defaultValue : 8,
      allowNull: true
    },
    progress_rate: {
      type: DataTypes.DECIMAL(10,0),
      defaultValue : 0,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    balance : {
      type: DataTypes.INTEGER,
      defaultValue : "-500",
      allowNull: true
    },    
    specializtion_idspecializtion : {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'specializtion',
        key: 'idspecializtion'
      }
    },
    children_idchild : {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'children',
        key: 'idchildren'
      }
},
    package_name : {
      type : DataTypes.STRING,
      unique : true,
      allowNull: true,
    },
  }
  , {
    sequelize,
    tableName: 'packeges',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idpackeges" },
          { name: "children_idchild" },
          { name: "specializtion_idspecializtion" }
        ]
      },
      {
        name: "idpackeges_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idpackeges" },
        ]
      },{
        name: "packeges_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "children_idchild" },
        ]
      }
    ]
  });
  return Packages;
};
