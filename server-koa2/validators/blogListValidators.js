const { Validator } = require('./validator')

class BlogListValidators extends Validator {
  constructor() {
    super()
    this.author = [
      ['isLength', 'author字符串长度不能大于4', { min: 0, max: 4 }],
      ['isLength', 'author字符串长度不能大于10', { min: 0, max: 10 }]
    ]
    this.keyword = [
      ['isLength', 'keyword字符串长度不能大于4', { min: 0, max: 4 }]
    ]
  }
}

module.exports = {
  BlogListValidators
}
