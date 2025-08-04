const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Payment = sequelize.define('payment', {
    idpayment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'payment',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idpayment" },
          { name: "packeges_idpackeges" },
        ]
      },
      {
        name: "idpayment_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idpayment" },
        ]
      },
      {
        name: "fk_payment_packeges1_idx",
        using: "BTREE",
        fields: [
          { name: "packeges_idpackeges" },
        ]
      },
    ]
  });
  return Payment;
};
