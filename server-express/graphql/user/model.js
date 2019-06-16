const {
  GraphQLID,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql')

const GraphQLDate = require('graphql-date')

const UserType = new GraphQLObjectType({
  name: 'BlogType',
  fields: {
    _id: {
      type: GraphQLID
    },
    id: {
      type: GraphQLInt
    },
    username: {
      type: GraphQLString
    },
    realname: {
      type: GraphQLString
    }
  }
})

const UserInput = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    username: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  }
})

module.exports = {
  UserType,
  UserInput
}
