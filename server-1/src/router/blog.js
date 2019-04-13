const { getList } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise
}

const handleBlogRouter = (req, res) => {
  const method = req.method

  getPostData(req).then(postData => {
    req.body = postData

    // 获取列表
    if (method === 'GET' && req.path === '/api/blog/list') {
      const author = req.query.author || ''
      const keyword = req.query.keyword || ''
      const listData = getList(author, keyword)

      return new SuccessModel(listData)
    }

    // 获取详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
      return {
        msg: '详情'
      }
    }

    // 新建
    if (method === 'POST' && req.path === '/api/blog/new') {
      return {
        msg: '新建'
      }
    }

    // 删除
    if (method === 'POST' && req.path === '/api/blog/del') {
      return {
        msg: '删除'
      }
    }
  })
}

module.exports = handleBlogRouter
