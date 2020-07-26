const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaMorgan = require('koa-morgan')
const path = require('path')
const fs = require('fs')
const requireDirectory = require('require-directory')
const Router = require('koa-router')
const { REDIS_CONF, SECURITY } = require('./conf/db')
const catchError = require('./middleware/exception')
const router = new Router()

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(catchError)
app.use(json())
app.use(logger())

// logger
app.use(async (ctx: any, next: any) => {
  const start = new Date() as any
  await next()
  const ms = new Date() as any - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 日志配置
const ENV = process.env.NODE_ENV
if (ENV === 'dev') {
  app.use(koaMorgan('dev'))
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flag: 'a'
  })
  app.use(
    koaMorgan('combined', {
      stream: writeStream
    })
  )
}

// session配置
app.keys = [SECURITY.secretKey]
app.use(
  session({
    // 配置cookie
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    // 配置redis
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  })
)

// 自动匹配路由方法
requireDirectory(module, `${process.cwd()}/src/routes`, { visit: loadRouters })
function loadRouters(obj: any) {
  if (obj instanceof Router) {
    app.use(obj.routes())
  }
}
app.use(router.allowedMethods())

// error-handling
app.on('error', (err: any, ctx: any) => {
  console.error('server error', err, ctx)
})

module.exports = app
