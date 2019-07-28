const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')

const sequelize = new Sequelize(
  MYSQL_CONF.database,
  MYSQL_CONF.user,
  MYSQL_CONF.password,
  {
    dialect: 'mysql',
    host: MYSQL_CONF.host,
    port: MYSQL_CONF.port,
    timezone: '+08:00',
    logging: true,
    define: {
      // true时则会创建 update_time create_time delete_time
      timestamps: false
    }
  }
)

sequelize.sync({
  force: true
})

module.exports = {
  sequelize
}
