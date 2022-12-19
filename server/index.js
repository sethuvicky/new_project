const express = require('express');
const app = express();
const {USERS} = require("./models");
const {Todos} = require("./models");

const {sign} = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cors = require("cors");
const  jwt =  require("jsonwebtoken")
const config = require("./refreshTokenConfig.json")
const cookieParser =  require("cookie-parser");

app.use(cookieParser());

app.use(cors({ origin: true, credentials: true }));
app.use(express.json())
const db = require("./models");
const { graphqlHTTP } = require('express-graphql');
const {GraphQLObjectType, GraphQLSchema} = require('graphql');
// db.init()
const todoMutations = require('./graphql/todo/mutations');
const todoQuery = require('./graphql/todo/query');



const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...todoQuery
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
       ...todoMutations
    })
})

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema: new GraphQLSchema({
        query: Query,
        mutation: Mutation
    })
}))


app.post("/auth",async(req,res)=>{
    const {email,password} =req.body
 
    const user = await USERS.findOne({where :{email:email}})

    if(!user){
       res.json({error:"user not found"}) 
    }else{
       bcrypt.compare(password,user.password).then((match)=>{

           if(!match){
               res.json({error:"username or password incorrect"})
           }else{
                   // if  user we generate token for that user 
               const accessToken  = sign({username:user.username,id:user.id},"importantsecretkey",{ expiresIn: '5s' })
               const refreshToken = jwt.sign(
                {username:user.username,id:user.id}
            , 'importantsecretkey', { expiresIn: '1d' });
    
                   console.log(refreshToken)

  
               res
               .cookie("access_token", accessToken, {
                 httpOnly: true,
                 
               })
               res
               .cookie("refresh_token", refreshToken, {
                 httpOnly: true,
                 
               })
               .status(200)
               .json("login successful");           }
   
        })
   
    }


  
})
app.post("/todo",async(req,res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
  
    jwt.verify(token, "importantsecretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

 
        const values = {
        title:  req.body.title,
        USERId:  userInfo.id, // decoded user id when we validate the token 
    }
        Todos.create(values).then(()=>{
                console.log('created Post')
            })

      
      });


  
})

app.get("/isAuthenticated",async(req,res)=>{
   const token = req.cookies.access_token;
   if (!token) return res.status(401).json("Not authenticated!");
 
 
   jwt.verify(token, "importantsecretkey", (err, userInfo) => {
       if (err) return res.status(403).json("Token is not valid!");
       if(userInfo) return res.status(200).json(userInfo)


   

     
     });


 
})
 
  
app.get("/user/:id",async(req,res)=>{
   const {id} = req.params

   const user = await USERS.findByPk(id)

   res.json(user)



  
})

app.post('/refresh', (req, res) => {
    if (req.cookies?.refresh_token) {

        // Destructuring refreshToken from cookie
        const refreshToken = req.cookies.refresh_token;

        // Verifying refresh token

        
  

                jwt.verify(refreshToken, "importantsecretkey", (err, userInfo) => {
                    if (err) return res.status(403).json("Token is not valid!");
                    // if(userInfo) return res.status(200).json(userInfo)
                    console.log(userInfo)
             
                   // Correct token we send a new access token
                   const accessToken = jwt.sign({
                    username: userInfo.username,
                   
                },'importantsecretkey', {
                    expiresIn: '10m'
                });
                console.log(accessToken)
                return    res
                .cookie("access_token", accessToken, {
                  httpOnly: true,
                  
                }),    res.cookie("refresh_token", null, {
                    expires: new Date(Date.now()),
                    httpOnly: true,
                  }),
                    
      res.status(200).json({
        success: true,
        message: "Log out success",
      });

                
                
             
                  
                  });
      
       
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
})
app.get("/logout",(req,res)=>{
    res.cookie("access_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
    
      res.status(200).json({
        success: true,
        message: "Log out success",
      });
}) 


db.sequelize.sync().then(()=>{
    app.listen(3004, () => {
        console.log("Server is running on port 3004")
    })
})


