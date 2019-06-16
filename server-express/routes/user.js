const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { secretKey } = require('../conf/constant')

function createJwt(req) {
  const tokenObj = {
    username: req.body.username
  }
  const token = jwt.sign(tokenObj, secretKey, {
    expiresIn: 60 * 60 * 24 // 授权时效24小时
  })

  return token
}

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  const result = login(username, password)
  return result.then(data => {
    if (data && data.username) {
      // 设置 session
      req.session.username = data.username
      req.session.realname = data.realname

      const token = createJwt(req)
      res.json(new SuccessModel())
      return
    }
    res.json(new ErrorModel('登陆失败'))
  })
})

router.get('/login', (req, res, next) => {
  const { username, password } = req.query
  const result = login(username, password)
  return result.then(data => {
    if (data && data.username) {
      // 设置 session
      req.session.username = data.username
      req.session.realname = data.realname

      const token = createJwt(req)
      res.json(new SuccessModel({ token }))
      return
    }
    res.json(new ErrorModel('登陆失败'))
  })
})

module.exports = router
