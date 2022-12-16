module.exports = (sequelize, DataTypes) => {
  const USERS = sequelize.define("USERS", {
 
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    
   
  });

  
  USERS.associate = (models)=>{
    USERS.hasMany(models.Todos,{
        onDelete:"cascade"
    })
    
  }


  return USERS;
};


