const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  const { request } = ctx
  const author = request.query.author || ''
  const keyword = request.query.keyword || ''
  const result = getList(author, keyword)
  return result.then(listData => {
    ctx.body = new SuccessModel(listData)
  })
})

router.get('/detail', (ctx, next) => {
  const { request } = ctx
  const id = request.query.id || ''
  const result = getDetail(id)
  return result.then(detailData => {
    ctx.body = new SuccessModel(detailData)
  })
})

router.post('/new', loginCheck, (ctx, next) => {
  const { request } = ctx
  request.body.author = request.session.username
  const result = newBlog(request.body)
  return result.then(newData => {
    ctx.body = new SuccessModel(newData)
  })
})

router.post('/update', loginCheck, (ctx, next) => {
  const { request } = ctx
  const id = request.query.id || ''
  const result = updateBlog(id, request.body)
  return result.then(ret => {
    if (ret) {
      ctx.body = new SuccessModel()
    } else {
      ctx.body = new ErrorModel('更新失败')
    }
  })
})

router.post('/del', loginCheck, (ctx, next) => {
  const { request } = ctx
  const id = request.query.id
  const author = request.session.username
  const result = delBlog(id, author)
  return result.then(ret => {
    if (ret) {
      ctx.body = new SuccessModel()
    } else {
      ctx.body = new ErrorModel('删除失败')
    }
  })
})

module.exports = router
