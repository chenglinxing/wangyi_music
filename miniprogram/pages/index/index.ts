// index.ts
// 获取应用实例
import {
  getHomeBanner,
  getNewSong,
  getPersonalized
} from "../../api/index"

import { transformNumber } from "../../utils/util"

Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    bannerList: [], //轮播图
    headerTitleList: [
      {
        title: '推荐',
        icon: "icon-remenhot",
        key: 0
      }, {
        title: '排行榜',
        icon: "icon-paihangbang",
        key: 1
      },
      {
        title: '热门歌单',
        icon: "icon-gedan",
        key: 2
      }, {
        title: '喜欢',
        key: 3,
        icon: "icon-xihuan",
      }], //tag
    musicList: [
      {
        title: "推荐歌单",
        titleOpreateName: "查看更多",
        list: []
      },
      {
        title: "新歌",
        titleOpreateName: "查看更多",
        list: []
      }
    ],//音乐列表   推荐歌单type=0   新歌type=1
    isBottom: false,//判断是否滚动到底
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
    console.log(e.currentTarget.dataset.titleitem)
    let { key, title } = e.currentTarget.dataset.titleitem
    // wx.navigateTo({
    //   url: "../songSheet/index?key=" + key
    // })
    wx.showToast({
      title: title,
      icon: "none"
    })
  },

  //点击搜索框
  handleClickSearch() {
    wx.navigateTo({
      url: "../search/index"
    })
  },

  //点击菜单
  handleClickMenu() {
    wx.showToast({
      title: "菜单离家出走了~",
      icon: "none"
    })
  },

  //点击菜单
  handleClickSound() {
    wx.showToast({
      title: "录音坏了，还在维修中~",
      icon: "none"
    })
  },


  //获取新歌
  async getNewSongData(type: any) {
    const data: any = await getNewSong(type)
    console.log(data, '新歌');

    let result = data.data.map((i: any) => {
      return {
        id: i.id,
        bgUrl: i.album.blurPicUrl,
        songName: i.name,
        singer: i?.artists[0].name || "",
        type: 1,//新歌
      }
    })
    let newSongList = result.slice(0, 3)
    this.setData({
      ['musicList[1].list']: newSongList
    })
    console.log(this.data.musicList, 'result');
  },

  //获取推荐歌单
  async getRecommandSongList() {
    const data: any = await getPersonalized(9)
    console.log(data.result, '111')
    let result = data.result.map((i: any) => {
      return {
        id: i.id,
        bgUrl: i.picUrl,
        desc: i.name,
        playCount: transformNumber(i.playCount),
        type: 0,//推荐
      }
    })
    this.setData({
      ['musicList[0].list']: result
    })
  },

  //页面滚动
  scroll(e: any) {
    console.log(e);
  },
  //滚动到底部
  bindscrolltolower(e: any) {
    console.log(e, '到底');
    this.setData({
      isBottom: true
    })
  },
  onLoad() {
 
    this.initBanner();
    this.getNewSongData(0);
    this.getRecommandSongList()
    //获取用户信息
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (userInfoRes: any) {
              console.log(userInfoRes.userInfo);

              wx.setStorageSync("userInfo", userInfoRes.userInfo)
            }
          })
        }
      }
    })
  },
  onPageScroll() {
    console.log(1);

  },
  onReady() {

  }
})
