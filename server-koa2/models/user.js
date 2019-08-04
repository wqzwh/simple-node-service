const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')
const { sequelize } = require('../db/sequelize')
const {
  NotFoundException,
  AuthFailed401Exception
} = require('../model/exceptionType')

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      throw new NotFoundException('账号不存在')
    }

    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new AuthFailed401Exception('密码不正确')
    }

    return user
  }

  static async getUserByOpenId(openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }

  static async registerUserByOpenId(openid) {
    return await User.create({
      openid
    })
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(128),
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const psw = bcrypt.hashSync(val, salt)
        this.setDataValue('password', psw)
      }
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true
    }
  },
  {
    sequelize,
    tableName: 'user'
  }
)

module.exports = User
