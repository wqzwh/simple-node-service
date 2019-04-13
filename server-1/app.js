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
  req.query = querystring.parse(url.split('?')[0])

  // 处理路由
  const blogData = handlerBlogRouter(req, res)

  if (blogData) {
    res.end(JSON.stringify(blogData))
    return
  }

  const userData = handlerUserRouter(req, res)
  if (userData) {
    res.end(JSON.stringify(userData))
    return
  }

  // 404
  res.writeHead(404, { 'Content-type': 'text/plain' })
  res.write('404 not found')
  res.end()
}

module.exports = serverHandle

// process.env.NODE_ENV
