// index.ts
// 获取应用实例
import {
  getHomeBanner
} from "../../api/index"

Page({
  data: {
    bannerList: [],
    headerTitleList: [{
      title: '每日推荐'
    }, {
      title: '私人FM'
    }, {
      title: '歌单'
    }, {
      title: '排行榜'
    }, ]
  },
  //初始化获取banner图
  async initBanner() {
    const data:any = await getHomeBanner({
      type: 2
    })
    if (data.code === 200) {
      this.setData({
        bannerList: data.banners
      })
    }
  },
  onLoad() {
    this.initBanner()
  },
})
