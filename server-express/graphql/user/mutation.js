const {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString
} = require('graphql')
const { login } = require('../../controller/user')

const { UserInput } = require('./model')

const UserLogin = {
  type: GraphQLBoolean,
  description: '用户登陆',
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(UserInput)
    }
  },
  resolve(root, params, options) {
    const { data } = params
    const { username, password } = data
    const result = login(username, password)
    return result.then(data => {
      if (data && data.username) {
        // 设置 session
        root.session.username = data.username
        root.session.realname = data.realname

        return true
      }
      return false
    })
  }
}

module.exports = {
  UserLogin
}
