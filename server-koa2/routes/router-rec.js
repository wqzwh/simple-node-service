const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
  getOverview
} = require('../controller/con-recommendation')
const ServiceRecOverview = require('../services/svs-rec-overview')
const loginCheck = require('../middleware/loginCheck')
const { RecommendationOverviewValidators } = require('../validators/val-rec-overview')

router.prefix('/v1/api/recommendation')

router.get('/overview', loginCheck, async (ctx, next) => {
  const v = await new RecommendationOverviewValidators().checkParams(ctx)
  const startTime = v.get('query.startTime') || ''
  const endTime = v.get('query.endTime') || ''
  const overviewData = await getOverview(startTime, endTime)
  const resData = await ServiceRecOverview.formatData(overviewData)
  if (overviewData) {
    ctx.body = new SuccessModel(resData)
  } else {
    ctx.body = new ErrorModel('返回失败')
  }
})

module.exports = router
