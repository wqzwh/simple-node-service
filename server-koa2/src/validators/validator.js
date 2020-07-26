const { get, last, cloneDeep, isEmpty } = require('lodash')
const validator = require('validator')
const { ParameterException } = require('../helper/exception-type')

class Validator {
  constructor() {
    this.data = {}
    this.errors = []
  }

  async checkParams(ctx) {
    // 创建对象保存参数
    this.data = cloneDeep(this.createParams(ctx))
    let _result = {}
    let _thisObject = {}

    // 遍历this.data得出参数数据
    for (const v in this.data) {
      if (v !== 'headers') {
        _result = Object.assign({}, _result, this.get(v))
      }
    }

    for (const v in this) {
      if (v !== 'data' && v !== 'errors') {
        _thisObject[v] = this[v]
      }
    }

    // 1、不传参数，this.data里面没有参数，但是在检验类中定义了待检测的属性，则直接报参数不符合规则错误
    // 2、传递了参数，this.data里面有参数，检验类中定义了待检测的属性，再运行下面的检测逻辑
    const _proto = Object.getOwnPropertyNames(this.__proto__)
    if (isEmpty(_result) && isEmpty(_thisObject)) {
      return
    } else if (isEmpty(_result) && !isEmpty(_thisObject)) {
      for (const v in _thisObject) {
        this.getValidator(this[v], null)
      }
    } else {
      for (const v in _result) {
        this.getValidator(this[v], _result[v])
      }
    }
    for (const v of _proto) {
      if (v.includes('check')) {
        await this.checkCallback(v)
      }
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

  /**
   *
   * @param {*} rules 每个变量对应的规则集合， 数组类型
   * @param {*} result 每个变量对应的值
   */
  getValidator(rules, result) {
    // rules 中如果包含isOptional类型，则先判断是否有传值，如果没有传值，则直接跳出循环，反之则使用传递的值进行校验
    // 如果rules类型不是数组则直接返回，不做检验
    if (Object.prototype.toString.call(rules) !== '[object Array]') return
    for (const v of rules) {
      if (
        (v[0] === 'isOptional' && result === null) ||
        (v[0] === 'isOptional' && result !== null)
      ) {
        break
      } else if (result === null) {
        v[1] ? this.errors.push(v[1]) : ''
      } else {
        if (!validator[v[0]](result, v[2] || { allow_display_name: false })) {
          this.errors.push(v[1])
        }
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
