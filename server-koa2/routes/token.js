const router = require('koa-router')()
const { TokenValidators } = require('../validators/tokenValidators')
const loginType = require('../constant/loginType')
const User = require('../models/user')
const { ParameterException } = require('../model/exceptionType')
router.prefix('/api/token')

router.post('/', async (ctx, next) => {
  const v = await new TokenValidators().checkParams(ctx)
  switch (v.get('body.type')) {
    case loginType.USER_EMAIL:
      await emailLogin(v.get('body.account'), v.get('body.secret'))
      break

    case loginType.USER_MINT_PROGRAM:
      break

    default:
      throw new ParameterException('没有处理类型的函数')
  }
})

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
}

module.exports = router
