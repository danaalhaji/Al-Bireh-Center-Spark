const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    iduser: {
      autoIncrement: true,
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
    password: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: "Password must be at least 8 characters"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
      validate: {
          isIn: {
            args: [["admin", "user"]],
            msg: "Role must be either 'admin' or 'user'"
    }
  }
},
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg : "This phone number is already in use",
      },
      validate: {
        is: {
          args: /^(?:\+?972|972|0)(5[0-9]{8})$/,
          msg: "Invalid phone number format.",
        }
      }
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: {
        msg: "This email is already in use",
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email must be a valid email'
        }
      }
    },
  specializtion_idspecializtion: {
  type: DataTypes.INTEGER,
  allowNull: true,
  references: {
    model: 'specializtion',
    key: 'idspecializtion'
  }
},
  }, {
    sequelize,
    tableName: 'user',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "iduser" }],
      },
      {
        name: "iduser_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [{ name: "iduser" }],
      },
    ],
  });

  User.beforeCreate(async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.prototype.validPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
  };

  return User;
};
