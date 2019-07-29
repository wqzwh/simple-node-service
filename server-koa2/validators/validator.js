const { get, last, cloneDeep, capitalize } = require('lodash')
const validator = require('validator')
const { ParameterException } = require('../model/exceptionType')

class Validator {
  constructor() {
    this.data = {}
    this.errors = []
  }

  async checkParams(ctx) {
    // 创建对象保存参数
    this.data = cloneDeep(this.createParams(ctx))
    let _result = {}

    // 遍历this.data得出参数数据
    for (const v in this.data) {
      _result = this.get(v)
    }

    // 遍历参数对象进行校验收集错误
    for (const v in _result) {
      this.getValidator(this[v], _result[v])
      await this.checkCallback(`check${capitalize(v)}`)
    }

    if (!this.errors.length) return this
    const error = new ParameterException(this.errors)
    throw error
  }

  /**
   *
   * @param {*} functionName 自定义函数方法名称
   */
  async checkCallback(functionName) {
    if (typeof this[functionName] === 'function') {
      try {
        if (this[functionName](this.data)) {
          await this[functionName](this.data)
        } else {
          this[functionName](this.data)
        }
      } catch (error) {
        this.errors.push(error.message)
      }
    }
  }

  /**
   *
   * @param {*} rules 每个变量对应的规则集合， 数组类型
   * @param {*} result 每个变量对应的值
   */
  getValidator(rules, result) {
    for (const v of rules) {
      if (!validator[v[0]](result, v[2] || { allow_display_name: false })) {
        this.errors.push(v[1])
      }
    }
  }

  createParams(ctx) {
    const { params, request } = ctx
    return {
      path: params,
      query: request.query,
      headers: request.header,
      body: request.body
    }
  }

  /**
   * get获取参数的方法
   * @param {*} path 通过传入path.id字符串来获取id参数
   */
  get(path) {
    const value = get(this.data, path, null)
    if (value === null) {
      const keys = path.split('.')
      const key = last(keys)
      return get(this.data, key)
    }
    return value
  }
}

module.exports = {
  Validator
}
