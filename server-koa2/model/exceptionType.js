class ExceptionBase extends Error {
  constructor(msg = '', errorCode = 10001, code = 400) {
    super()
    this.msg = msg
    this.errorCode = code
    this.code = code
  }
}

// 参数错误类型
class ParameterException extends ExceptionBase {
  constructor(msg = '', errorCode = 10001) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 400
  }
}

// 403禁止访问
class Forbbiden403Exception extends ExceptionBase {
  constructor(msg = '禁止访问', errorCode = 100075) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 403
  }
}

// 401错误类型
class AuthFailed401Exception extends ExceptionBase {
  constructor(msg = '授权失败', errorCode = 10004) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 404
  }
}

// 404错误类型
class NotFoundException extends ExceptionBase {
  constructor(msg = '暂无资源', errorCode = 10001) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 404
  }
}

// 201类型
class Success201Exception extends ExceptionBase {
  constructor(msg = '成功', errorCode = 0) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 201
  }
}

module.exports = {
  ExceptionBase,
  ParameterException,
  NotFoundException,
  Success201Exception,
  AuthFailed401Exception,
  Forbbiden403Exception
}
