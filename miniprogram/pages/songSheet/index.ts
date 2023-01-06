// pages/songSheet/index.ts
import {
  getHotSongSheet,
  getSongListDetailById
} from "../../api/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songSheetlist: [],//热门歌单
    activeTitle: null,//动态class  默认第一个
    songListParams: {
      id: "",
      limit: 10,
      offset: 1
    },//获取歌单详情所需参数
    currentSongList: [],//当前歌单详情信息
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
  async handleClickTitle(e: any) {
    console.log(e.currentTarget.dataset);
    this.setData({
      activeTitle: e.currentTarget.dataset.id,
      songListParams: {
        id: e.currentTarget.dataset.id,
        limit: 10,
        offset: 0
      }
    })
    await this.getSongListDetail(this.data.songListParams)
  },

  //根据歌单id获取歌单详情
  async getSongListDetail(params) {
    const data: any = await getSongListDetailById(params)
    console.log(data);
    let currentSongList: any = []
    if (data.code === 200) {
      currentSongList = data.songs || []
    } else {
      currentSongList = []
    }
    this.setData({
      currentSongList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options: any) {
    console.log(options);
    //key=0 热门歌单  key=1 精选
    if (options.key == 0) {
      await this.initHotSongSheet()
      this.setData({
        songListParams: {
          id: this.data.activeTitle || "",
          limit: 10,
          offset: 1
        }
      })
      let { songListParams } = this.data
      await this.getSongListDetail(songListParams)
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