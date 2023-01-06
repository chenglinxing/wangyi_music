// index.ts
// 获取应用实例
import {
  getHomeBanner,
  getNewSong
} from "../../api/index"

Page({
  data: {
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
        title: '歌手',
        key: 3,
        icon: "icon-sing",
      }], //tag
    musicList: [
      {
        title: "热门",
        titleOpreateName: "查看更多",
        list: []
      },
      {
        title: "新歌",
        titleOpreateName: "查看更多",
        list: []
      }
    ],//音乐列表
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
    let { key,title } = e.currentTarget.dataset.titleitem
    // wx.navigateTo({
    //   url: "../songSheet/index?key=" + key
    // })
    wx.showToast({
      title: title,
      icon:"none"
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
        singer: i?.artists[0].name || ""
      }
    })
    let newSongList = result.slice(0, 6)

    this.setData({
      ['musicList[0].list']: newSongList
    })
    console.log(this.data.musicList, 'result');
  },
  onLoad() {
    this.initBanner();
    this.getNewSongData(0)
  },
})
