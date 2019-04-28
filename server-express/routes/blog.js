const express = require('express')
const router = express.Router()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.get('/list', loginCheck, (req, res, next) => {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })
})

router.get('/detail', loginCheck, (req, res, next) => {
  const id = req.query.id || ''
  const result = getDetail(id)
  return result.then(detailData => {
    res.json(new SuccessModel(detailData))
  })
})

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(newData => {
    res.json(new SuccessModel(newData))
  })
})

router.post('/update', loginCheck, (req, res, next) => {
  const id = req.query.id || ''
  const result = updateBlog(id, req.body)
  return result.then(ret => {
    if (ret) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('更新失败'))
    }
  })
})

router.post('/del', loginCheck, (req, res, next) => {
  const id = req.query.id
  const author = req.session.username
  const result = delBlog(id, author)
  return result.then(ret => {
    if (ret) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('删除失败'))
    }
  })
})

module.exports = router
