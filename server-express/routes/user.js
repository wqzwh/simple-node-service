const express = require('express')
const router = express.Router()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

router.get('/login', (req, res, next) => {
  const { username, password } = req.query
  const result = login(username, password)
  return result.then(data => {
    if (data && data.username) {
      // 设置 session
      req.session.username = data.username
      req.session.realname = data.realname

      // 同步redis
      set(req.sessionId, req.session)

      res.json(new SuccessModel())
    }
    res.json(new ErrorModel('登陆失败'))
  })
})

module.exports = router
