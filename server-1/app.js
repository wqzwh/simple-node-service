const querystring = require('querystring')
const handlerBlogRouter = require('./src/router/blog')
const handlerUserRouter = require('./src/router/user')

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

  // 处理路由
  const blogResult = handlerBlogRouter(req, res)
  if (blogResult) {
    blogResult.then(blogData => {
      if (blogData) {
        res.end(JSON.stringify(blogData))
      }
      return
    })
  }

  const userResult = handlerUserRouter(req, res)
  if (userResult) {
    userResult.then(userData => {
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
