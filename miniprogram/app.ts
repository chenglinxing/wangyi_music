// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {

    wx.requestSubscribeMessage({
      tmplIds: ["Ju4VwpU8-oaXyYBlVi306H5DeUyocjhH_tjsdqIQiQg"],
      success: (res: any) => {
        console.log("授权成功", res)
      },
      fail: (res: any) => {
        console.log("授权失败", res)

      }
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})