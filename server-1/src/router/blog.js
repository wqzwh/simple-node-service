const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
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

  return getPostData(req).then(postData => {
    req.body = postData

    // 获取列表
    if (method === 'GET' && req.path === '/api/blog/list') {
      const author = req.query.author || ''
      const keyword = req.query.keyword || ''
      const result = getList(author, keyword)
      return result.then(listData => {
        return new SuccessModel(listData)
      })
    }

    // 获取详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
      const id = req.query.id || ''
      const result = getDetail(id)
      return result.then(detailData => {
        return new SuccessModel(detailData)
      })
    }

    // 新建
    if (method === 'POST' && req.path === '/api/blog/new') {
      const result = newBlog(req.body)
      return result.then(newData => {
        return new SuccessModel(newData)
      })
    }

    // 更新
    if (method === 'POST' && req.path === '/api/blog/update') {
      const id = req.query.id || ''
      const result = updateBlog(id, req.body)
      return result.then(res => {
        if (res) {
          return new SuccessModel()
        } else {
          return new ErrorModel('更新失败')
        }
      })
    }

    // 删除
    if (method === 'POST' && req.path === '/api/blog/del') {
      const id = req.query.id || ''
      const author = req.query.author || ''
      const result = delBlog(id, author)
      return result.then(res => {
        if (res) {
          return new SuccessModel()
        } else {
          return new ErrorModel('删除失败')
        }
      })
    }
  })
}

module.exports = handleBlogRouter
