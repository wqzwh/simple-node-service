const router = require('koa-router')()
const { TokenValidators } = require('../validators/tokenValidators')
const { NotEmptyValidator } = require('../validators/notEmptyValidator')
const loginType = require('../constant/loginType')
const User = require('../models/user')
const { ParameterException } = require('../model/exceptionType')
const { generateToken } = require('../utils/util')
const { SuccessModel } = require('../model/resModel')
const Auth = require('../middleware/auth')
const WXManager = require('../services/wx')

router.prefix('/api/token')

router.post('/', async (ctx, next) => {
  const v = await new TokenValidators().checkParams(ctx)
  let token
  switch (v.get('body.type')) {
    case loginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break

    case loginType.USER_MINT_PROGRAM:
      token = await WXManager.codeToToken(v.get('body.account'))
      break

    default:
      throw new ParameterException('没有处理类型的函数')
  }
  ctx.body = new SuccessModel({ token })
})

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, Auth.USER)
}

// 验证token
router.post('/verify', async (ctx, next) => {
  const v = await new NotEmptyValidator().checkParams(ctx)
  const token = Auth.verifyToken(v.get('body.account'))
  ctx.body = new SuccessModel({ token })
})

module.exports = router
