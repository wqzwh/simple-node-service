const axios = require('axios')
const { C } = require('../conf/host')
const { AuthFailed401Exception, Forbbiden403Exception } = require('./exception-type')

const requestTimeout = 3000

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

function configData(type, params) {
  // POST传参序列化
  if (type === 'post') {
    return params
  } else if (type === 'put') {
    return params
  } else if (type === 'delete') {
    return params
  }
  return null
}

function isMock(mock) {
  if (process.env.STATS === 'dist') return false
  if (mock) return true
  return false
}

function formatUrl(littleUrl, config) {
  let url = ''
  if (config.hostType === 'mock' || isMock(config.MOCK)) {
    url = C.MOCK_HOST + littleUrl
  } else if (config.hostType === 'gateway') {
    url = C.GATEWAY_HOST + littleUrl
  } else {
    url = C.HOST + littleUrl
  }
  return url
}

function errorCodeControl(response) {
  const { data } = response
  if (data.code === 401) {
    return response
  }
}

function errorStatusControl(error) {
  const { status } = error.response
  if (status === 401) {
    const errors = new AuthFailed401Exception('登陆验证失败')
    throw errors
  }
}

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use(
  response => {
    const { data } = response
    // 根据返回的code值来做不同的处理（和后端约定）
    if (data.code === 0) {
      if (data.data) {
        return data
      } else {
        const errors = new Forbbiden403Exception('暂无权限')
        throw errors
      }
    } else {
      errorCodeControl(response)
    }
  },
  error => {
    errorStatusControl(error)
  }
)

function ajax(url, type, options, config = {}) {
  const requireUrl = formatUrl(url, config)
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: requireUrl,
      timeout: requestTimeout,
      canReTry: config && config.canReTry,
      params: type === 'get' ? options : null,
      data: configData(type, options)
    })
      .then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}

const Api = {
  get(url, options, config) {
    return new Promise((resolve, reject) => {
      ajax(url, 'get', options, config).then(
        data => {
          resolve(data)
        },
        error => {
          reject(error)
        }
      )
    })
  },

  post(url, options, config) {
    return new Promise((resolve, reject) => {
      ajax(url, 'post', options, config).then(
        data => {
          resolve(data)
        },
        error => {
          reject(error)
        }
      )
    })
  },

  put(url, options) {
    return new Promise((resolve, reject) => {
      ajax(url, 'put', options, config).then(
        data => {
          resolve(data)
        },
        error => {
          reject(error)
        }
      )
    })
  },

  delete(url, options, config) {
    return new Promise((resolve, reject) => {
      ajax(url, 'delete', options, config).then(
        data => {
          resolve(data)
        },
        error => {
          reject(error)
        }
      )
    })
  }
}

module.exports = {
  Api
}
