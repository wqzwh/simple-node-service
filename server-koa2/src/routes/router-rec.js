const router = require('koa-router')()
const { Success200Exception, Error10000Exception } = require('../helper/exception-type')
const {
  getOverview
} = require('../controller/con-recommendation')
const ServiceRecOverview = require('../services/svs-rec-overview')
const loginCheck = require('../middleware/login-check')
const { RecommendationOverviewValidators } = require('../validators/val-rec-overview')

router.prefix('/v1/api/recommendation')

router.get('/overview', loginCheck, async (ctx, next) => {
  const v = await new RecommendationOverviewValidators().checkParams(ctx)
  const startTime = v.get('query.startTime') || ''
  const endTime = v.get('query.endTime') || ''
  const overviewData = await getOverview({ startTime, endTime }, ctx)
  const resData = await ServiceRecOverview.formatData(overviewData)
  if (overviewData) {
    ctx.body = new Success200Exception(resData)
  } else {
    ctx.body = new Error10000Exception('返回失败')
  }
})

module.exports = router
