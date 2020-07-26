const { Error10000Exception } = require('../helper/exception-type')

const loginCheck = async (ctx, next) => {
  // 调用sso单点登陆接口，通过cookie判断是否登陆
  if (ctx) {
    await next()
    return
  }
  ctx.body = new Error10000Exception('未登录')
}

module.exports = loginCheck
