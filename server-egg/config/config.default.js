const fs = require('fs')
const path = require('path')

module.exports = appInfo => {
  const config = {}

  // should change to your own
  config.keys = appInfo.name + '123456'

  config.siteFile = {
    '/favicon.ico': fs.readFileSync(
      path.join(appInfo.baseDir, 'app/public/favicon.png')
    )
  }

  config.blog = {
    serverUrl: 'https://hacker-news.firebaseio.com/api/blog'
  }

  return config
}
