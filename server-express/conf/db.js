const env = process.env.NODE_ENV // 环境变量

// 配置
let MYSQL_CONF
let REDIS_CONF
let HOST_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
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

  HOST_CONF = {
    base: 'http://localhost:3000'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
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

  HOST_CONF = {
    port: 3000,
    base: 'http://localhost:3000'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
  HOST_CONF
}
