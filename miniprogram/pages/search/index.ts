// pages/search/index.ts
import { getHotDetail, getRecommandSong, getSearchData } from "../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent: "",//搜索框内容
    searchPlaceholder: "晚风-7Copy",
    songList: [],
    isShowHistory: true,//搜索后隐藏历史  展示查询列表 默认展示
    recommandSongList: [],//推荐歌曲
    showRecommandSongList: [],//推荐歌曲只展示部分
    hotDetailList: [],//热搜榜歌曲
  },
  //双向绑定输入框的值
  handleInputContent(event: any) {
    // console.log(event);
    let { value } = event.detail
    this.setData({
      searchContent: value,
      isShowHistory: !value,
      songList: [],
    })
  },
  //点击搜索
  async handleInputSearch() {
    // console.log(this.data.searchContent, 'searchContent');
    let content = this.data.searchContent ? this.data.searchContent : this.data.searchPlaceholder
    if (content) {
      this.setData({
        searchContent: content,
        isShowHistory: !content,
      })
    }
    const data: any = await getSearchData(content)
    console.log(data.result)
    if (data.code === 200) {
      this.setData({
        songList: data.result.songs || []
      })
    }
  },
  //刷新推荐列表
  handleRefreshRecommand() {
    let { recommandSongList } = this.data
    //向下取整
    let radomNum = Math.floor(Math.random() * recommandSongList.length)
    let showRecommandSongList = []
    if (radomNum + 4 > recommandSongList.length) {
      showRecommandSongList = recommandSongList.slice(radomNum, recommandSongList.length)
    } else {
      showRecommandSongList = recommandSongList.slice(radomNum, radomNum + 4)
    }
    this.setData({
      showRecommandSongList
    })

  },

  //点击当前歌曲
  handleClikSontItem(event: any) {
    let { currentsong } = event.currentTarget.dataset
    // console.log(currentsong);
    let { name: songName, artists } = currentsong
    let nameList = []
    if (artists.length) {
      nameList = artists.map(i => {
        return i.name
      })
    }
    console.log(nameList, songName);
    let author = nameList.join("/")
    wx.navigateTo({
      url: `../song/index?songId=${currentsong.id}&author=${author}&songName=${songName}`
    })
  },

  //点击推荐
  handleClickRecommandItem(e: any) {
    let { recommanditem } = e.currentTarget.dataset
    this.setData({
      searchContent: recommanditem.name
    })
    this.handleInputSearch()
    console.log(recommanditem, this.data.songList);
    // wx.navigateTo({
    //   url: `../song/index?songId=${recommanditem.id}&author=${recommanditem.name}&songName=${recommanditem.name}`
    // })
  },

  //点击热搜榜
  handleClickHotDetailItem(e: any) {
    let { hotdetailitem } = e.currentTarget.dataset
    console.log(hotdetailitem);
    this.setData({
      searchContent: hotdetailitem.searchWord,
      isShowHistory: !hotdetailitem.searchWord,
    })
    this.handleInputSearch()
  },

  //获取推荐歌曲
  async initRecommandSong() {
    const data: any = await getRecommandSong()
    this.setData({
      recommandSongList: data.result || [],
      showRecommandSongList: data.result.slice(0, 4)
    })
  },

  //获取热搜榜
  async initHotDetail() {
    const data: any = await getHotDetail()
    this.setData({
      hotDetailList: data.data || []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    await this.initRecommandSong()
    await this.initHotDetail()
  },
})