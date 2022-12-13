const { DataTypes } = require("sequelize");
const db = require("../dbconfig");


const USERS = db.sequelise.define("USERS", {
 
  email: DataTypes.STRING,
  password: DataTypes.STRING,


});



module.exports = USERS
