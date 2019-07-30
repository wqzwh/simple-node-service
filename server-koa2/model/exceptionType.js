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
  Success201Exception
}
