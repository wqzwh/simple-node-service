const { Validator } = require('./validator')

function isThisType(val) {
  for (const v in this) {
    if (this[v] === val) {
      return true
    }
  }
  return false
}

const loginType = {
  USER_MINT_PROGRAM: 100,
  USER_EMAIL: 100,
  USER_PHONE: 100,
  isThisType
}

class TokenValidators extends Validator {
  constructor() {
    super()
    this.account = [['isLength', '不符合账号规则', { min: 4, max: 32 }]]
    this.secret = [
      ['isOptional'],
      ['isLength', '至少6个字符', { min: 6, max: 128 }]
    ]
  }

  checkLoginType({ body }) {
    if (!body.type) throw new Error('type参数必须传入')
    if (!loginType.isThisType(body.type)) throw new Error('type参数不合法')
  }
}

module.exports = {
  TokenValidators
}
