const http = require('http')
const slice = Array.prototype.slice
class Qxpress {
  constructor() {
    // 定义一个路由集合
    this.routers = {
      all: [],
      get: [],
      post: []
    }
  }

  regist(path) {
    const info = {}
    if (typeof path === 'string') {
      info.path = path
      info.stacks = slice.call(arguments, 1)
    } else {
      info.path = '/'
      info.stacks = slice.call(arguments, 0)
    }
    return info
  }

  use() {
    const info = this.regist.apply(this, arguments)
    this.routers.all.push(info)
  }

  get() {
    const info = this.regist.apply(this, arguments)
    this.routers.get.push(info)
  }

  post() {
    const info = this.regist.apply(this, arguments)
    this.routers.post.push(info)
  }

  // 区分所有的routers，那些需要被命中执行
  match(method, url) {
    let ret = []
    if (url === '/favicon.ico') {
      return ret
    }

    // 根据method获取相应的routers
    let retRouters = []
    retRouters = retRouters.concat(this.routers.all)
    retRouters = retRouters.concat(this.routers[method])

    retRouters.forEach(routerItem => {
      if (url === routerItem.path || routerItem.path === '/') {
        ret = ret.concat(routerItem.stacks)
      }
    })
    return ret
  }

  callback() {
    return (req, res) => {
      res.json = data => {
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(data))
      }
      const url = req.url
      const method = req.method.toLowerCase()
      const resultList = this.match(method, url)
      this.handler(req, res, resultList)
    }
  }

  handler(req, res, stack) {
    const next = () => {
      const md = stack.shift()
      if (md) {
        md(req, res, next)
      }
    }
    next()
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = () => {
  return new Qxpress()
}
