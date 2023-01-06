export const service = (params: any) => {
  return new Promise((resolve, reject) => {
    wx.showLoading({title:"加载中"})
    wx.request({
      url: 'http://60.205.95.118:3000' + params.requestUrl,
      ...params,
      success(res) {
        resolve(res.data)
        wx.hideLoading()
      },
      fail(err) {
        reject(err)
      }
    })
  })
}