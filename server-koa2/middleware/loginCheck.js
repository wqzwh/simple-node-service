const { ErrorModel } = require('../model/resModel')

const loginCheck = (ctx, next) => {
  const { request } = ctx
  if (request.session.username) {
    next()
    return
  }
  ctx = new ErrorModel('未登录')
}

module.exports = loginCheck
