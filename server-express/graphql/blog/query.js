const {
  GraphQLID,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} = require('graphql')
const request = require('request-promise')
const { getList } = require('../../controller/blog')
const { BlogType } = require('./model')
const { HOST_CONF } = require('../../conf/db')

function fetchResponseByURL(relativeURL) {
  return request({
    url: `${HOST_CONF.base}${relativeURL}`,
    json: true
  })
}

function fetchBookByURL(relativeURL) {
  return fetchResponseByURL(relativeURL)
}

const Blog = {
  type: new GraphQLList(BlogType),
  args: {
    author: {
      type: GraphQLString,
      defaultValue: ''
    },
    keyword: {
      type: GraphQLString,
      defaultValue: ''
    }
  },
  resolve(root, params, context, info) {
    // 调用转发接口形式
    // const res = fetchBookByURL(
    //   `/api/blog/list?author=${params.author}&keyword=${params.keyword}`
    // )
    // return res.then(data => {
    //   return data.data
    // })

    // 直接操作数据库
    const author = params.author
    const keyword = params.keyword
    const result = getList(author, keyword)
    return result.then(listData => {
      return listData
    })
  }
}

const BlogItem = {
  type: BlogType,
  args: {
    author: {
      type: GraphQLString,
      defaultValue: ''
    },
    keyword: {
      type: GraphQLString,
      defaultValue: ''
    }
  },
  resolve(root, params, context, info) {
    // 直接操作数据库
    const author = params.author
    const keyword = params.keyword
    const result = getList(author, keyword)
    return result.then(listData => {
      for (const v of listData) {
        if (v.author === params.author || v.keyword === params.author) {
          return v
        }
      }
    })
  }
}

module.exports = {
  Blog,
  BlogItem
}
