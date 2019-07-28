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
const { BlogListValidators } = require('../validators/blogListValidators')

router.prefix('/api/blog')

router.get('/list/:id', async (ctx, next) => {
  const v = new BlogListValidators().checkParams(ctx)
  const author = v.get('query.author') || ''
  const keyword = v.get('query.keyword') || ''
  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
  const v = new Validator(ctx, {
    'query.id': [['isLength', 'id字符串长度不能大于4', { min: 0, max: 4 }]]
  })
  const id = v.get('query.id') || ''
  const detailData = await getDetail(id)
  ctx.body = new SuccessModel(detailData)
})

router.post('/new', loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const newData = await newBlog(body)
  ctx.body = new SuccessModel(newData)
})

router.post('/update', loginCheck, async (ctx, next) => {
  const id = ctx.query.id || ''
  const ret = await updateBlog(id, ctx.request.body)
  if (ret) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新失败')
  }
})

router.post('/del', loginCheck, async (ctx, next) => {
  const id = ctx.query.id
  const author = ctx.session.username
  const ret = await delBlog(id, author)
  if (ret) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除失败')
  }
})

module.exports = router
