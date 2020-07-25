const { Validator } = require('./validator')

class RecommendationOverviewValidators extends Validator {
  constructor() {
    super()
    this.startTime = [['isLength', '不允许为空', { min: 8 }]]
    this.endTime = [['isLength', '不允许为空', { min: 8 }]]
  }
}

module.exports = {
  RecommendationOverviewValidators
}
