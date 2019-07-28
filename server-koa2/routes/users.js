const router = require('koa-router')()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { Validator } = require('../validators/validator')

router.prefix('/api/user')

router.post('/register', async (ctx, next) => {
  const v = new Validator(
    ctx,
    {
      'body.email': [['isEmail', 'email不符合规则']],
      'body.nickname': [
        ['isLength', 'nickname字符串长度不能大于20', { min: 0, max: 20 }]
      ],
      'body.password1': [
        ['isLength', 'password1字符串长度不能大于30', { min: 6, max: 30 }],
        [
          'matches',
          'password1密码不符合规则',
          '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
        ]
      ],
      'body.password2': [
        ['isLength', 'password2字符串长度不能大于30', { min: 6, max: 30 }],
        [
          'matches',
          'password2密码不符合规则',
          '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
        ]
      ]
    },
    ({ body }) => {
      const pw1 = body.password1
      const pw2 = body.password2
      if (pw1 !== pw2) {
        throw new Error('两个密码必须相同')
      }
    }
  )
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
