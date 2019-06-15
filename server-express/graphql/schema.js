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
const { SuccessModel, ErrorModel } = require('../model/resModel')
const BlogQueries = require('./blog/query')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: assign(BlogQueries)
  })
})
