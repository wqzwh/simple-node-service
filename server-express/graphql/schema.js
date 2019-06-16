const {
  GraphQLID,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} = require('graphql')
const assign = require('lodash/assign')
const { getList } = require('../controller/blog')
const BlogQueries = require('./blog/query')
const BookMutations = require('./blog/mutation')
const UserQueries = require('./user/query')
const UserMutations = require('./user/mutation')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: assign(BlogQueries, UserQueries)
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutations',
    fields: assign(BookMutations, UserMutations)
  })
})
