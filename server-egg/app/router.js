module.exports = app => {
  const { router, controller } = app
  router.get('/list', controller.news.list)
}
