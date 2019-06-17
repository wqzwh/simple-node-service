const createError = require('http-errors')
const path = require('path')
const fs = require('fs')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const graphqlHTTP = require('express-graphql')
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const jwtRouter = require('./routes/jwt')
const schema = require('./graphql/schema')

const app = express()

const ENV = process.env.NODE_ENV

if (ENV === 'dev') {
  app.use(logger('dev'))
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flag: 'a'
  })
  app.use(
    logger('combined', {
      stream: writeStream
    })
  )
}
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser('WEsd_123@#'))

// 设置跨域访问
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true) //带cookies
  res.header('X-Powered-By', ' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == 'OPTIONS') {
    res.send(200)
  } else if (req.method == 'GET') {
    req.body = req.query
    next()
  } else {
    next()
  }
})

const redisClient = require('./db/redis')
app.use(
  session({
    store: new RedisStore({
      client: redisClient
    }),
    secret: 'WEsd_123@#',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true // 是否保存未初始化的会话
  })
)

app.use('/api', jwtRouter)
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)
app.use(
  '/graphql',
  graphqlHTTP((request, response, graphQLParams) => ({
    schema,
    rootValue: { session: request.session },
    graphiql: true, // 是否开启界面编辑
    context: { token: request.header.authorization }
  }))
)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'dev' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    error: -1,
    msg: 'error'
  })
})

module.exports = app
