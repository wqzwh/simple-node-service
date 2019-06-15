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
const { SuccessModel, ErrorModel } = require('../../model/resModel')

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
  resolve(root, params, options) {
    // const res = fetchBookByURL(
    //   `/api/blog/list?author=${params.author}&keyword=${params.keyword}`
    // )
    // return res.then(data => {
    //   console.log(data.data)
    //   return data.data
    // })
    const author = params.author
    const keyword = params.keyword
    const result = getList(author, keyword)
    return result.then(listData => {
      console.log(listData)
      return listData
    })
  }
}

module.exports = {
  Blog
}
