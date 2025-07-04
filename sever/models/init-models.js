var DataTypes = require("sequelize").DataTypes;
var _available_times = require("./available_times");
var _children = require("./children");
var _criteria = require("./criteria");
var _initial_assessment = require("./initial_assessment");
var _packeges = require("./packeges");
var _partents = require("./partents");
var _payment = require("./payment");
var _session = require("./session");
var _specializtion = require("./specializtion");
var _user = require("./user");

function initModels(sequelize) {
  var available_times = _available_times(sequelize, DataTypes);
  var children = _children(sequelize, DataTypes);
  var criteria = _criteria(sequelize, DataTypes);
  var initial_assessment = _initial_assessment(sequelize, DataTypes);
  var packeges = _packeges(sequelize, DataTypes);
  var partents = _partents(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var session = _session(sequelize, DataTypes);
  var specializtion = _specializtion(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  user.belongsTo(specializtion, { foreignKey: "specializtion_idspecializtion" });
  specializtion.hasMany(user, { foreignKey: "specializtion_idspecializtion" });

  session.belongsTo(available_times, { as: "available_times_idavailable_available_time", foreignKey: "available_times_idavailable" });
  available_times.hasMany(session, { as: "sessions", foreignKey: "available_times_idavailable" });
  session.belongsTo(available_times, { as: "available_times_user_iduser_available_time", foreignKey: "available_times_user_iduser" });
  available_times.hasMany(session, { as: "available_times_user_iduser_sessions", foreignKey: "available_times_user_iduser" });

  criteria.belongsTo(children, { as: "children_idchildren_child", foreignKey: "children_idchildren" });
  children.hasMany(criteria, { as: "criteria", foreignKey: "children_idchildren" });
  criteria.belongsTo(children, { as: "children_partents_idpartents_child", foreignKey: "children_partents_idpartents" });
  children.hasMany(criteria, { as: "children_partents_idpartents_criteria", foreignKey: "children_partents_idpartents" });
  criteria.belongsTo(children, { as: "children_packeges_idpackeges_child", foreignKey: "children_packeges_idpackeges" });
  children.hasMany(criteria, { as: "children_packeges_idpackeges_criteria", foreignKey: "children_packeges_idpackeges" });
  criteria.belongsTo(children, { as: "children_initial_assessment_idinitial_assessment_child", foreignKey: "children_initial_assessment_idinitial_assessment" });
  children.hasMany(criteria, { as: "children_initial_assessment_idinitial_assessment_criteria", foreignKey: "children_initial_assessment_idinitial_assessment" });
  criteria.belongsTo(children, { as: "children_initial_assessment_user_iduser_child", foreignKey: "children_initial_assessment_user_iduser" });
  children.hasMany(criteria, { as: "children_initial_assessment_user_iduser_criteria", foreignKey: "children_initial_assessment_user_iduser" });

  children.belongsTo(initial_assessment, { as: "initial_assessment_idinitial_assessment_initial_assessment", foreignKey: "initial_assessment_idinitial_assessment" });
  initial_assessment.hasMany(children, { as: "children", foreignKey: "initial_assessment_idinitial_assessment" });
  children.belongsTo(initial_assessment, { as: "initial_assessment_user_iduser_initial_assessment", foreignKey: "initial_assessment_user_iduser" });
  initial_assessment.hasMany(children, { as: "initial_assessment_user_iduser_children", foreignKey: "initial_assessment_user_iduser" });

  specializtion.belongsTo(initial_assessment, { as: "initial_assessment_idinitial_assessment_initial_assessment", foreignKey: "initial_assessment_idinitial_assessment" });
  initial_assessment.hasMany(specializtion, { as: "specializtions", foreignKey: "initial_assessment_idinitial_assessment" });
  specializtion.belongsTo(initial_assessment, { as: "initial_assessment_user_iduser_initial_assessment", foreignKey: "initial_assessment_user_iduser" });
  initial_assessment.hasMany(specializtion, { as: "initial_assessment_user_iduser_specializtions", foreignKey: "initial_assessment_user_iduser" });

  children.belongsTo(packeges, { as: "packeges_idpackeges_packege", foreignKey: "packeges_idpackeges" });
  packeges.hasMany(children, { as: "children", foreignKey: "packeges_idpackeges" });
  payment.belongsTo(packeges, { as: "packeges_idpackeges_packege", foreignKey: "packeges_idpackeges" });
  packeges.hasMany(payment, { as: "payments", foreignKey: "packeges_idpackeges" });
  session.belongsTo(packeges, { as: "packeges_idpackeges_packege", foreignKey: "packeges_idpackeges" });
  packeges.hasMany(session, { as: "sessions", foreignKey: "packeges_idpackeges" });

  children.belongsTo(partents, { as: "partents_idpartents_partent", foreignKey: "partents_idpartents" });
  partents.hasMany(children, { as: "children", foreignKey: "partents_idpartents" });

  available_times.belongsTo(user, { as: "user_iduser_user", foreignKey: "user_iduser" });
  user.hasMany(available_times, { as: "available_times", foreignKey: "user_iduser" });
  initial_assessment.belongsTo(user, { as: "user_iduser_user", foreignKey: "user_iduser" });
  user.hasMany(initial_assessment, { as: "initial_assessments", foreignKey: "user_iduser" });

  return {
    available_times,
    children,
    criteria,
    initial_assessment,
    packeges,
    partents,
    payment,
    session,
    specializtion,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
