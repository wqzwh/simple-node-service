const { ErrorModel } = require('../model/resModel')

const loginCheck = async (ctx, next) => {
  // 调用sso单点登陆接口，通过cookie判断是否登陆
  if (ctx) {
    await next()
    return
  }
  ctx.body = new ErrorModel('未登录')
}

module.exports = loginCheck
