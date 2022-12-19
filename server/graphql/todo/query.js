const { GraphQLList, GraphQLInt,GraphQLString } = require("graphql");
const { connect } = require("../../dbconfig");
const {Todos} = require("../../models");
const {USERS} = require("../../models");
const {sign} = require("jsonwebtoken")
const TodoType = require("./typeDef");
const UserType = require("./typeUser");
const bcrypt = require("bcrypt")

const getAllTodos = {
    type: new GraphQLList(TodoType),
    args: {
        USERId: { type: GraphQLInt },
    },
    resolve: async (parent, args, context, info) => {
        await connect();
        const todos = await Todos.findAll({
            where: { USERId: args.USERId },
          })
           return todos

     }
}

const getTodo = {
    type: TodoType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: async (parent, args, context, info) => {
        await connect();
        const todo = await Todos.findByPk(args.id, {
        });
        return todo;
    }
}



module.exports = {
    getAllTodos,
    getTodo,
}