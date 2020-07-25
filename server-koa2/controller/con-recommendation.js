const { exec } = require('../db/mysql')

const getOverview = async (startTime, endTime) => {
  let sql = `select * from recommendationRealTime where 1=1 `
  if (startTime) {
    sql += `and date>='${startTime}'`
  }
  if (endTime) {
    sql += `and date<='${endTime}%'`
  }

  sql += `order by date desc`
  return await exec(sql)
}

module.exports = {
  getOverview
}
