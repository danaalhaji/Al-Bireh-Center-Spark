const dbConfig = require("../config/config");
const Sequelize = require("sequelize");

const { DataTypes } = Sequelize;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: "mysql"
});

const db = {};
db.User = require('./user')(sequelize, DataTypes);
db.Spec = require('./specializtion')(sequelize, DataTypes);
db.AvailabeTimes = require('./available_times')(sequelize, DataTypes);
db.Session = require('./session')(sequelize, DataTypes);
db.Child = require('./children')(sequelize, DataTypes);
db.Parent = require('./parents')(sequelize, DataTypes);
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.User.belongsTo(db.Spec, { foreignKey: "specializtion_idspecializtion" });
db.Spec.hasMany(db.User, { foreignKey: "specializtion_idspecializtion" });

db.Child.belongsTo(db.Child , { foreignKey : "parents_idparents"});
db.Parent.hasMany(db.Child , { foreignKey : "parents_idparents"});

module.exports = db;
