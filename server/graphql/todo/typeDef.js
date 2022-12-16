const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const TodoType = new GraphQLObjectType({
    name: "Todos",
    fields: () => ({ 
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        USERId: { type: GraphQLInt },

    })
})


module.exports = TodoType