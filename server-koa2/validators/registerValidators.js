const { Validator } = require('./validator')

class RegisterValidators extends Validator {
  constructor() {
    super()
    this.email = [['isEmail', 'email不符合规则']]
    this.nickname = [
      ['isLength', 'nickname字符串长度不能大于20', { min: 0, max: 20 }]
    ]
    this.password1 = [
      ['isLength', 'password1字符串长度不能大于30', { min: 6, max: 30 }],
      [
        'matches',
        'password1密码不符合规则',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
      ]
    ]
    this.password2 = this.password1
  }

  checkpassword1({ body }) {
    const pw1 = body.password1
    const pw2 = body.password2
    if (pw1 !== pw2) {
      throw new Error('两个密码必须相同')
    }
  }
}

module.exports = {
  RegisterValidators
}
