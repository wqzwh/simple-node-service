const {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString
} = require('graphql')
const { newBlog, delBlog } = require('../../controller/blog')

const { BlogInput, BlogType } = require('./model')

const BlogCreate = {
  type: BlogType,
  description: '添加blog',
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(BlogInput)
    }
  },
  resolve(root, params, options) {
    const { data } = params
    const result = newBlog(data)
    return result.then(newData => {
      return newData
    })
  }
}

const BlogDel = {
  type: GraphQLBoolean,
  description: '删除blog',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt)
    },
    author: {
      name: 'author',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params, options) {
    const { id, author } = params
    const result = delBlog(id, author)
    return result.then(newData => {
      return newData
    })
  }
}

module.exports = {
  BlogCreate,
  BlogDel
}
