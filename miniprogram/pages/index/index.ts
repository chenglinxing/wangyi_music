// index.ts
// 获取应用实例
import {
  getHomeBanner, getHotSongSheet
} from "../../api/index"

Page({
  data: {
    bannerList: [], //轮播图
    headerTitleList: [
      //   {
      //   title: '每日推荐'
      // }, {
      //   title: '私人FM'
      // }, 
      {
        title: '热门歌单',
        key: 0
      }, {
        title: '精选',
        key: 1
      }], //tag
  },
  //初始化获取banner图
  async initBanner() {
    const data: any = await getHomeBanner({
      type: 2
    })
    if (data.code === 200) {
      this.setData({
        bannerList: data.banners
      })
    }
  },


  //点击title
  handleClickTitle(e: any) {
    console.log(e.currentTarget.dataset.title)
    let key = e.currentTarget.dataset.title
    wx.navigateTo({
      url: "../songSheet/index?key=" + key
    })
  },
  onLoad() {
    this.initBanner()
  },
})
