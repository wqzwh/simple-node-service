const querystring = require('querystring')
const handlerBlogRouter = require('./src/router/blog')
const handlerUserRouter = require('./src/router/user')

// session 数据
const SESSION_DATA = {}

// 获取 cookie的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

const serverHandle = (req, res) => {
  // 设置返回格式为json
  res.setHeader('Content-type', 'application/json')

  // 处理path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析query参数
  req.query = querystring.parse(url.split('?')[1])

  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })

  // 解析 session
  let needSetCookie = false
  let userId = req.cookie.userid
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]

  // 处理路由
  const blogResult = handlerBlogRouter(req, res)
  if (blogResult) {
    blogResult.then(blogData => {
      if (blogData) {
        if (needSetCookie) {
          res.setHeader(
            'Set-Cookie',
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          )
        }
        res.end(JSON.stringify(blogData))
      }
      return
    })
  }

  const userResult = handlerUserRouter(req, res)
  if (userResult) {
    userResult.then(userData => {
      if (needSetCookie) {
        res.setHeader(
          'Set-Cookie',
          `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
        )
      }
      res.end(JSON.stringify(userData))
      return
    })
  }

  // 404
  if (!blogResult && !userData) {
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 not found')
    res.end()
  }
}

module.exports = serverHandle
