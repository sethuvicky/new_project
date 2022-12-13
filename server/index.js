const express = require('express');
const app = express();

const cors = require("cors");



app.use(cors());

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
db.sequelize.sync().then(()=>{
    app.listen(3004, () => {
        console.log("Server is running on port 3004")
    })
})


