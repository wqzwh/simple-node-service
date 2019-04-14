const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 登陆验证
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method

  // 获取列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheck(req)
    }
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
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheck(req)
    }
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(newData => {
      return new SuccessModel(newData)
    })
  }

  // 更新
  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheck(req)
    }
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
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheck(req)
    }
    const id = req.query.id
    const author = req.session.username
    const result = delBlog(id, author)
    return result.then(res => {
      if (res) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除失败')
      }
    })
  }
}

module.exports = handleBlogRouter
