const jwt = require('jsonwebtoken')
const { SECURITY } = require('../conf/db')
const generateToken = (uid, scope) => {
  const { secretKey, expiresIn } = SECURITY
  const token = jwt.sign(
    {
      uid,
      scope
    },
    secretKey,
    { expiresIn }
  )
  return token
}

module.exports = {
  generateToken
}
