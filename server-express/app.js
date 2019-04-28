const createError = require('http-errors')
const path = require('path')
const fs = require('fs')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const redisStore = require('connect-redis')(session)

const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')

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
app.use(cookieParser())
const redisClient = require('./db/redis')
const sessionStore = new redisStore({
  client: redisClient
})
app.use(
  session({
    secret: 'WEsd_123@#',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
  })
)

app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

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
