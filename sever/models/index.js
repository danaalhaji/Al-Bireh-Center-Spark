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
db.Packages = require('./packeges')(sequelize, DataTypes);
db.Payment = require('./payment')(sequelize, DataTypes);
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.User.belongsTo(db.Spec, { foreignKey: "specializtion_idspecializtion" });
db.Spec.hasMany(db.User, { foreignKey: "specializtion_idspecializtion" });

db.Child.belongsTo(db.Parent, { foreignKey: "parents_idparents", as: "parent" });
db.Parent.hasMany(db.Child, { foreignKey: "parents_idparents", as: "children" });

db.Session.belongsTo(db.Child,{foreignKey: "children_idchild"});
db.Child.hasMany(db.Session,{foreignKey: "children_idchild"});

db.Packages.belongsTo(db.Child, { foreignKey:"children_idchild"});
db.Child.hasMany(db.Packages , { foreignKey:"children_idchild"});

db.Payment.belongsTo(db.Packages, { foreignKey: "packeges_idpackeges" });
db.Packages.hasMany(db.Payment, {foreignKey: "packeges_idpackeges" });

db.Packages.hasMany(db.Session , {foreignKey : "packeges_idpackeges"});
db.Session.belongsTo(db.Packages , {foreignKey : "packeges_idpackeges"})


module.exports = db;
