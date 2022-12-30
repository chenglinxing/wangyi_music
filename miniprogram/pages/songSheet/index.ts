// pages/songSheet/index.ts
import {
  getHotSongSheet
} from "../../api/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songSheetlist: [],//热门歌单
    activeTitle: null,//动态class  默认第一个
  },
  //初始化获取热门歌单
  async initHotSongSheet() {
    const data: any = await getHotSongSheet()
    console.log(data)
    if (data.code === 200) {
      this.setData({
        songSheetlist: data.tags,
        activeTitle: data.tags[0].id
      })
    }
  },

  //点击title
  handleClickTitle(e: any) {
    console.log(e.currentTarget.dataset);
    this.setData({
      activeTitle: e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {
    console.log(options);
    if (options.key == 0) {
      this.initHotSongSheet()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})