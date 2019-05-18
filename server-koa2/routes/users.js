const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', (ctx, next) => {
  const { request } = ctx
  const { username, password } = request.body
  const result = login(username, password)
  return result.then(data => {
    if (data && data.username) {
      // 设置 session
      request.session.username = data.username
      request.session.realname = data.realname

      ctx.body = new SuccessModel()
      return
    }
    ctx.body = new ErrorModel('登陆失败')
  })
})

module.exports = router
