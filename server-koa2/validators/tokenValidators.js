const { Validator } = require('./validator')
const loginType = require('../constant/loginType')

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
