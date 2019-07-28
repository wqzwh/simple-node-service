const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { Validator } = require('../validators/validator')
const { RegisterValidators } = require('../validators/registerValidators')

router.prefix('/api/user')

router.post('/register', async (ctx, next) => {
  const v = new RegisterValidators().checkParams(ctx)
  const email = v.get('body.email')
  const nickname = v.get('body.nickname')
  const password1 = v.get('body.password1')
  const password2 = v.get('body.password1')
  ctx.body = {
    email,
    nickname,
    password1,
    password2
  }
})

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  const data = await login(username, password)
  if (data && data.username) {
    // 设置 session
    ctx.session.username = data.username
    ctx.session.realname = data.realname

    ctx.body = new SuccessModel()
    return
  }
  ctx.body = new ErrorModel('登陆失败')
})

// session测试代码
router.get('/session-test', async (ctx, next) => {
  if (ctx.session.viewCount === null) {
    ctx.session.viewCount = 0
  }
  ctx.session.viewCount++

  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount
  }
})

module.exports = router
