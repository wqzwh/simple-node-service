const { ExceptionBase } = require('../helper/exception-type')

const env = process.env.NODE_ENV // 环境变量
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (env === 'prod') throw err
    if (err instanceof ExceptionBase) {
      // 已知异常处理
      ctx.body = {
        msg: err.msg,
        code: err.code,
        request: `${ctx.method} ${ctx.path}`
      }
    } else {
      // 未知异常处理
      ctx.body = {
        msg: '未知异常',
        code: 90000,
        request: `${ctx.method} ${ctx.path}`
      }
    }
  }
}

module.exports = catchError
