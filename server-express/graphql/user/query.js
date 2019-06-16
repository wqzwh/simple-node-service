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

const { UserType } = require('./model')
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

const User = {
  type: UserType,
  args: {},
  resolve(root, params, options) {
    return {}
  }
}

module.exports = {
  User
}
