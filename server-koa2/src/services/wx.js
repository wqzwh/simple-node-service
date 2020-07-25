const util = require('util')
const axios = require('axios')
const { WX } = require('../conf/db')
const { AuthFailed401Exception } = require('../model/exceptionType')
const { User } = require('../../models/models-rec-realtime')
const { generateToken } = require('../utils/util')
const { Auth } = require('../middleware/auth')
class WXManager {
  static async codeToToken(code) {
    const url = util.format(WX.loginUrl, WX.appID, WX.appSecret, code)
    const result = await axios.get(url)

    if (result.status !== 200) {
      throw new AuthFailed401Exception('openId获取失败')
    }

    if (result.data.errcode !== 0) {
      throw new AuthFailed401Exception('errcode不合法')
    }

    // 判断数据库是否有openid，有则直接返回，没有则存储
    const openid = result.data.openid
    let user = await User.getUserByOpenId(openid)

    if (!user) {
      user = await User.registerUserByOpenId(openid)
    }

    return generateToken(user.id, Auth.USER)
  }
}

module.exports = WXManager
