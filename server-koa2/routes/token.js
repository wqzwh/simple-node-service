const router = require('koa-router')()
const { TokenValidators } = require('../validators/tokenValidators')
router.prefix('/api/token')

router.post('/', async (ctx, next) => {
  const v = await new TokenValidators().checkParams(ctx)
  ctx.body = '1111'
})

module.exports = router
