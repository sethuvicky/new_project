const { DataTypes } = require("sequelize");
const db = require("../dbconfig");


const Todo = db.sequelise.define("Todos", {
 
  title: DataTypes.STRING,

});



module.exports = Todo
