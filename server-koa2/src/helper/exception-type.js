class ExceptionBase extends Error {
  constructor(data = null, msg = '', code = 10001) {
    super()
    this.msg = msg
    this.code = code
    this.data = data
  }
}

// 参数错误类型
class ParameterException extends ExceptionBase {
  constructor(msg = '', code = 400) {
    super()
    this.msg = msg
    this.code = code
  }
}

// 403禁止访问
class Forbbiden403Exception extends ExceptionBase {
  constructor(msg = '禁止访问', code = 403) {
    super()
    this.msg = msg
    this.code = code
  }
}

// 401错误类型
class AuthFailed401Exception extends ExceptionBase {
  constructor(msg = '授权失败', code = 401) {
    super()
    this.msg = msg
    this.code = code
  }
}

// 404错误类型
class NotFoundException extends ExceptionBase {
  constructor(msg = '暂无资源', code = 404) {
    super()
    this.msg = msg
    this.code = code
  }
}

// 201类型
class Success201Exception extends ExceptionBase {
  constructor(msg = '成功', code = 201) {
    super()
    this.msg = msg
    this.code = code
  }
}

// 200 成功
class Success200Exception extends ExceptionBase {
  constructor(data, msg = '成功', code = 0) {
    super()
    this.msg = msg
    this.code = code
    this.data = data
  }
}

// 10000
class Error10000Exception extends ExceptionBase {
  constructor(data = null, msg = '失败', code = 10000) {
    super()
    this.msg = msg
    this.code = code
    this.data = data
  }
}

module.exports = {
  ExceptionBase,
  ParameterException,
  NotFoundException,
  Success201Exception,
  AuthFailed401Exception,
  Forbbiden403Exception,
  Success200Exception,
  Error10000Exception
}
