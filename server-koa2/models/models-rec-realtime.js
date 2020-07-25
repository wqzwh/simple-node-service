const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')
const { sequelize } = require('../db/sequelize')

class RecommendationRealTime extends Model {
  static async getOverview(startTime, endTime) {
    const overview = await RecommendationRealTime.findAll({
      where: {
        date: startTime
      }
    })
    return overview
  }
}

RecommendationRealTime.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pv: Sequelize.BIGINT,
    uv: Sequelize.BIGINT,
    uctr: Sequelize.BIGINT,
    ucvr: Sequelize.BIGINT,
    date: Sequelize.INTEGER
  },
  {
    sequelize,
    tableName: 'recommendationRealTime'
  }
)

module.exports = RecommendationRealTime
