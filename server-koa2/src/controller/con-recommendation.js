const { exec } = require('../db/mysql')
const RecommendationRealTime = require('../models/models-rec-realtime')
const { Api } = require('../helper/api')

const getOverview = async ({ startTime, endTime }, { _matchedRoute }) => {

  const data = await Api.get(_matchedRoute, { startTime, endTime }, { MOCK_HOST: true })
  return data

  // const data = await RecommendationRealTime.getOverview(startTime, endTime)
  // return data

  // let sql = `select * from recommendationRealTime where 1=1 `
  // if (startTime) {
  //   sql += `and date>='${startTime}'`
  // }
  // if (endTime) {
  //   sql += `and date<='${endTime}%'`
  // }

  // sql += `order by date desc`
  // return await exec(sql)
}

module.exports = {
  getOverview
}
