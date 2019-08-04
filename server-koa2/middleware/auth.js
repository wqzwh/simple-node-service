const basicAuth = require('basic-auth')
const { Forbbiden403Exception } = require('../model/exceptionType')
const { SECURITY } = require('../conf/db')

class Auth {
  constructor(level = 1) {
    this.level = level
    Auth.USER = 8
    Auth.ADMIN = 16
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      if (!userToken || !userToken.name) {
        throw new Forbbiden403Exception(errMsg)
      }
      let devode
      try {
        devode = jwt.verify(userToken.name, SECURITY.secretKey)
      } catch (error) {
        // 令牌不合法
        // 令牌过期
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token令牌过期'
        }
        throw new Forbbiden403Exception(errMsg)
      }

      if (devode.scope < this.level) {
        errMsg = '权限不足'
        throw new Forbbiden403Exception(errMsg)
      }

      // 保存传入到jwt中的一些关键信息参数
      ctx.auth = {
        uid: devode.uid,
        scope: devode.scope
      }

      await next()
    }
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, SECURITY.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = Auth
