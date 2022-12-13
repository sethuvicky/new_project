

const { GraphQLString, GraphQLNonNull, GraphQLInt } = require('graphql');

const TodoType = require('./typeDef');
const UserType = require('./typeUser');
const bcrypt = require("bcrypt")

const { connect } = require('../../dbconfig');

const Todo = require('../../models/Todo');
const USERS  = require("../../models/Users")
const createTodo = {
    type: TodoType,
    args: {
        title: { type: GraphQLString },
    },
    resolve: async (parent, args, context, info) => {
        await connect();
        const todo = await Todo.create(args);
        console.log(args)
        return "todo added successfully";
    }
    
}
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
        await connect();
        const user = await USERS.findOne({where :{email:args.email}})
        console.log(user.password)

    if(!user){
        return ('user not found') 
    }else{
       bcrypt.compare (args.password,user.password).then((match)=>{

           if(!match){
                return("username or password incorrect")
           }else{

            return("user found")

         
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
        const todo = await Todo.update(args, {
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
        const todo = await Todo.destroy({
            where: {
                id: args.id
            }
        });
        return "todo deleted successfully";
    }
}

module.exports = {
    createTodo,
    updateTodo,
    deleteTodo,
    CreateUser,
    LoginUser
}
