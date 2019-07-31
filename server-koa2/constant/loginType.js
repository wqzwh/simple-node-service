function isThisType(val) {
  for (const v in this) {
    if (this[v] === val) {
      return true
    }
  }
  return false
}

const loginType = {
  USER_MINT_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_PHONE: 102,
  ADMIN_EMAIL: 116,
  isThisType
}

module.exports = loginType
