const { get, last, cloneDeep } = require('lodash')
const validator = require('validator')
const { ParameterException } = require('../model/exceptionType')

class Validator {
  constructor(ctx, options, cb) {
    this.data = {}
    this.options = options
    this.cb = cb
    // 创建对象保存参数
    this.data = cloneDeep(this.createParams(ctx))

    this.getOptionsAttr(options)
  }

  getOptionsAttr(options) {
    // 遍历options的属性值
    const errors = []
    for (const v in options) {
      for (const vv of options[v]) {
        if (
          !validator[vv[0]](
            this.get(v, false),
            vv[2] || { allow_display_name: false }
          )
        ) {
          errors.push(vv[1])
        }
      }
    }

    if (this.cb) {
      try {
        this.cb(this.data)
      } catch (err) {
        errors.push(err.message)
      }
    }
    if (!errors.length) return
    const error = new ParameterException(errors)
    throw error
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
