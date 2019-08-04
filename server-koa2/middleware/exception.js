const { ExceptionBase } = require('../model/exceptionType')

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
        errorCode: err.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = err.code
    } else {
      // 未知异常处理
      ctx.body = {
        msg: '未知异常',
        errorCode: 90000,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
