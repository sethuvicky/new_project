const express = require('express');
const app = express();
const {USERS} = require("./models");
const {sign} = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cors = require("cors");



app.use(cors());
app.use(express.json())

const db = require("./models");
const { graphqlHTTP } = require('express-graphql');
const {GraphQLObjectType, GraphQLSchema} = require('graphql');
// db.init()
const todoMutations = require('./graphql/todo/mutations');
const todoQuery = require('./graphql/todo/query');
const Todo = require('./models/Todo');



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
    console.log(req.body)
 
    const user = await USERS.findOne({where :{email:email}})
    console.log(user)

    if(!user){
       res.json({error:"user not found"}) 
    }else{
       bcrypt.compare(password,user.password).then((match)=>{

           if(!match){
               res.json({error:"username or password incorrect"})
           }else{
                   // if  user we generate token for that user 
               const accessToken  = sign({username:user.username,id:user.id},"importantsecretkey")
               res.json({token :accessToken, user:user})
           }
   
        })
   
    }


  
})
app.get("/user/:id",async(req,res)=>{
   const {id} = req.params

   const user = await USERS.findByPk(id)

   res.json(user)



  
})

db.sequelize.sync().then(()=>{
    app.listen(3004, () => {
        console.log("Server is running on port 3004")
    })
})


