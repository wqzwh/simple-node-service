const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../db/sequelize')
const Op = Sequelize.Op

class RecommendationRealTime extends Model {
  static async getOverview(startTime, endTime) {
    const overview = await RecommendationRealTime.findAll({
      where: {
        date: {
          [Op.and]: {
            [Op.gte]: startTime,
            [Op.lte]: endTime
          }
        }
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
