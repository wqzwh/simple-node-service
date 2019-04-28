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

// 登陆验证
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

router.get('/list', (req, res, next) => {
  // const loginCheckResult = loginCheck(req)
  // if (loginCheckResult) {
  //   return loginCheck(req)
  // }
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })
})

module.exports = router
