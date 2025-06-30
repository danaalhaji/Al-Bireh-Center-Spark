const dbConfig = require("../config/config");
const Sequelize = require("sequelize");

const { DataTypes } = Sequelize;

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: "mysql"
});

const db = {};
db.User = require('./user')(sequelize, DataTypes);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
