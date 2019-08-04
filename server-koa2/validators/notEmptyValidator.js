const { Validator } = require('./validator')

class NotEmptyValidator extends Validator {
  constructor() {
    super()
    this.token = [['isLength', '不允许为空', { min: 1 }]]
  }
}

module.exports = {
  NotEmptyValidator
}
