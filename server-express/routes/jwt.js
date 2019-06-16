const expressJwt = require('express-jwt')
const express = require('express')
const router = express.Router()
const { secretKey } = require('../conf/constant')

const jwtAuth = expressJwt({
  secret: secretKey,
  credentialsRequired: true // 设置为false就不进行校验了，游客也可以访问
}).unless({
  path: [
    { url: '/api/blog/list', methods: ['GET'] },
    { url: '/api/user/login', methods: ['GET'] }
  ]
})

// 所有请求过来都会进行身份验证
router.use(jwtAuth)
// 路由中间件
router.use((req, res, next) => {
  // 任何路由信息都会执行这里面的语句
  console.log('this is a api request!')
  // 把它交给下一个中间件，注意中间件的注册顺序是按序执行
  next()
})

module.exports = router
