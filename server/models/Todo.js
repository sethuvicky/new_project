module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Todos", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
    
   
  });

  return Posts;
};


