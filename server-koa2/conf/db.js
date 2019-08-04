const env = process.env.NODE_ENV // 环境变量

// 配置
let MYSQL_CONF
let REDIS_CONF

const SECURITY = {
  secretKey: 'WEsd_123@#',
  expiresIn: 60 * 60 * 24 * 30
}

const WX = {
  appID: '',
  appSecret: '',
  loginUrl:
    'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
}

if (env === 'dev') {
  MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root123456',
    port: '3306',
    database: 'myblog',
    insecureAuth: true
  }

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root123456',
    port: '3306',
    database: 'myblog',
    insecureAuth: true
  }

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
  SECURITY,
  WX
}
