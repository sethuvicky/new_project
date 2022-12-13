 module.exports = (sequelize, DataTypes) => {
  const USERS = sequelize.define("USERS", {
 
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    
   
  });

  return USERS;
};


