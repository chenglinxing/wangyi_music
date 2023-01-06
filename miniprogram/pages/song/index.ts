// pages/song/index.ts
import { getSongLyric, getSongMP3, getSongDetail } from "../../api/index"

const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lyricInfo: "",//歌词信息
    lyricArr: [], //存取歌词信息 数组
    mp3Url: "",//MP3地址
    defaultPlay: true, //初始化进来默认播放
    songInfo: {},//歌曲信息包括歌名作者
    bgcUrl: "",//背景图片路径
    isShowSongBg: true,//默认展示背景  点击后展示歌词
    timer: 0,
    timer1: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options: any) {
    console.log(options);
    let { songId, author, songName } = options;
    this.setData({
      songInfo: { author, songName }
    })
    //获取背景图片
    const bgData: any = await getSongDetail(songId)
    // console.log(bgData.songs[0].al.picUrl, 'bgData1');
    this.setData({
      bgcUrl: bgData.songs[0].al.picUrl
    })
    //获取歌词
    const data: any = await getSongLyric(songId)
    if (data.code === 200) {
      let lyric = data.lrc.lyric
      let reg = /\[(.*?)](.*)/g
      let obj: any = {}
      lyric.replace(reg, (a, b, c) => {
        b = b.slice(0, 5)
        obj[b] = c
      })
      console.log(obj)
      this.setData({
        lyricInfo: obj,
        lyricArr: data.lrc.lyric.split("\n")
      })
    }
    //获取MP3
    const mp3Result: any = await getSongMP3(songId)
    console.log(mp3Result, 'mp3Result1');

    if (mp3Result.code === 200) {
      this.setData({
        mp3Url: mp3Result.data[0].url
      })
    }
    //进入页面后自动播放
    innerAudioContext.src = this.data.mp3Url
    innerAudioContext.autoplay = this.data.defaultPlay
  },

  //播放
  playMP3() {
    this.setData({
      defaultPlay: !this.data.defaultPlay
    })
    innerAudioContext.src = this.data.mp3Url
    innerAudioContext.autoplay = this.data.defaultPlay
    this.data.defaultPlay ? innerAudioContext.play() : innerAudioContext.pause()

    innerAudioContext.onPlay(() => {
      console.log('开始播放', innerAudioContext.duration)
      // this.MP3Start()

    })
    // innerAudioContext.onPause((listener) => {
    //   console.log('暂停播放', innerAudioContext.duration);
    //   // this.MP3Stop()
    // })

    // innerAudioContext.onCanplay((listener) => {
    //   console.log(listener, innerAudioContext.duration);
    // })
  },
  //播放
  MP3Start() {


    this.setData({
      timer: this.data.timer1
    })
    setTimeout(() => {
      this.setData({
        timer: this.data.timer++
      })
    }, 1000);
    console.log('播放', this.data.timer);
  },
  //暂停
  MP3Stop() {
    console.log('暂停', this.data.timer);
    this.setData({
      timer1: this.data.timer
    })
  },
  //点击歌词区域
  handleSongList() {
    this.setData({
      isShowSongBg: !this.data.isShowSongBg
    })
  },
  //点击每一行歌词
  handleClickSong(e: any) {
    console.log(e);

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(e: void) {
    console.log(e, 'data')
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
    innerAudioContext.stop()
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