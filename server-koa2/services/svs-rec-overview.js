class ServiceRecOverview {
  static async formatData(data) {
    data.forEach(item => {
      item.status = 2
    })
    return data
  }
}

module.exports = ServiceRecOverview
