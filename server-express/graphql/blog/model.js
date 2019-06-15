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

const BlogType = new GraphQLObjectType({
  name: 'Blog',
  fields: {
    _id: {
      type: GraphQLID
    },
    id: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    createtime: {
      type: GraphQLString
    },
    author: {
      type: GraphQLString
    }
  }
})

// const BlogInput = new GraphQLInputObjectType({
//   name: 'BlogInput',
//   fields: {
//     author: {
//       type: GraphQLString
//     }
//   }
// })

module.exports = {
  BlogType
  // BlogInput
}
