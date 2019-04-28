const qxpress = require('./qxpress')

const app = qxpress()

app.use((req, res, next) => {
  next()
})

app.use('/api', (req, res, next) => {
  next()
})

const check = (req, res, next) => {
  console.log('执行check方法')
  next()
}

app.get('/api/wq', check, (req, res, next) => {
  res.json({
    data: 11111
  })
})

app.listen(3000, () => {
  console.log('启动成功')
})
