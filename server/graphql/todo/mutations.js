

const { GraphQLString, GraphQLNonNull, GraphQLInt ,GraphQLError } = require('graphql');

const TodoType = require('./typeDef');
const UserType = require('./typeUser');
const bcrypt = require("bcrypt")

const { connect } = require('../../dbconfig');
const {Todos} = require("../../models")
const {USERS} = require("../../models")
const {sign} = require("jsonwebtoken")

// const createTodo = {
//     type: TodoType,
//     args: {
//         title: { type: GraphQLString },
//         USERId: { type: GraphQLInt },

//     },
//     resolve: async (parent, args, context, info) => {

//         const token = args.cookies.access_token;
//         console.log(token)
//         // if (!token) return res.status(401).json("Not authenticated!");
     
//         await connect();
//         const todo = await Todos.create(args);
//         console.log(args)
//         return "todo added successfully";
//     }
    
// }
const CreateUser = {
    type: UserType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },

    },
    resolve: async (parent, args, context, info) => {
        await connect();
        bcrypt.hash(args.password,10).then((hash)=>{

            console.log(hash)
            USERS.create({
                email:args.email,
                password:hash
            })
            return ("success")
    
        })
    }
    
}
const LoginUser = {
    type: UserType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },

    },
    
    resolve: async (parent, args, context, info) => {
        let accessToken;
        await connect();
        const user = await USERS.findOne({where :{email:args.email}})

    if(!user){
        throw new GraphQLError('User not found');
        }else{
       bcrypt.compare (args.password,user.password).then((match)=>{

           if(!match){
            return ('username or password incorrect"');

           }else {

              accessToken  = sign({username:user.username,id:user.id},"importantsecretkey")
                   console.log(accessToken)

         
           }
   
        })
   
    }


  
    }

    
}
const updateTodo  = {
    type: TodoType,
    args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLString },
    },
    resolve: async (parent, args, context, info) => {
        await connect();
        // logic to filter the blank values
        const todo = await Todos.update(args, {
            where: {
                id: args.id
            }
        });
        return "todo updated successfully";
    }
}

const deleteTodo = {
    type: GraphQLString,
    args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (parent, args, context, info) => {
        await connect();
        const todo = await Todos.destroy({
            where: {
                id: args.id
            }
        });
        return "todo deleted successfully";
    }
}

module.exports = {
    // createTodo,
    updateTodo,
    deleteTodo,
    CreateUser,
    LoginUser
}
