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
    this.errorCode = 10001
    this.code = 400
  }
}

// 404错误类型
class NotFoundException extends ExceptionBase {
  constructor(msg = '', errorCode = 10001) {
    super()
    this.msg = '暂无资源'
    this.errorCode = 40001
    this.code = 404
  }
}

module.exports = {
  ExceptionBase,
  ParameterException,
  NotFoundException
}
