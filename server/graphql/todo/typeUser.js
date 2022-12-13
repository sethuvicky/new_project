const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
    name: "USERS",
    fields: () => ({ 
        id: { type: GraphQLInt },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    })
})


module.exports = UserType