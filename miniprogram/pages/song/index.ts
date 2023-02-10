// pages/song/index.ts
import { getSongLyric, getSongMP3, getSongDetail } from "../../api/index"
import { formatTimeToMinutesAndSeconds } from "../../utils/util"

//背景音频
const backgroundAudioManager = wx.getBackgroundAudioManager();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    lyricInfo: "",//歌词信息
    lyricArr: [], //存取歌词信息 数组
    mp3Url: "",//MP3地址
    defaultPlay: true, //初始化进来默认播放
    songInfo: { author: "", songName: "" },//歌曲信息包括歌名作者
    bgcUrl: "",//背景图片路径
    isShowSongBg: true,//默认展示背景  点击后展示歌词
    currentTime: 0,//当前播放时间总时长
    duration: 0,//时长
    ballMoveWidth: 0,
    progeressBarPercentage: "0%",//进度条的所占百分比
    songDuration: 0,//歌曲时长
    pageShowSongDuration: "",//页面展示的歌曲时长 转换成分钟：秒
    songPlayDuration: "00:00",//进度条左边实时展示当前歌曲播放时长  展示格式 分钟:秒
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options: any) {
    console.log(options);
    backgroundAudioManager.onTimeUpdate(() => {
      let a = backgroundAudioManager.currentTime
      let b = backgroundAudioManager.duration
      let aa = 0
      let bb = 0
      aa += a
      bb += b
      //展示左侧播放时长
      let songPlayDuration = formatTimeToMinutesAndSeconds(aa, true)
      // console.log(aa, bb, songPlayDuration, 'd')
      const query = wx.createSelectorQuery();
      query.select("#progress-no-play").boundingClientRect()
      query.exec(res => {
        let width = res[0].width
        let ballMoveWidth = (Number((aa / bb).toFixed(2))) * width
        this.setData({
          ballMoveWidth
        })
      })



      let { currentTime, duration } = backgroundAudioManager
      this.setData({
        currentTime, duration, songPlayDuration
      })
    })
    let { songId, author, songName } = options;
    this.setData({
      songInfo: { author, songName }
    })
    //获取背景图片
    const bgData: any = await getSongDetail(songId)
    // console.log(bgData.songs[0].al.picUrl, 'bgData1');
    //获取歌曲时长
    const songDuration = bgData.songs[0].dt
    console.log(songDuration,'songDurationsongDurationsongDurationsongDuration')
    const pageShowSongDuration = formatTimeToMinutesAndSeconds(songDuration)
    this.setData({
      bgcUrl: bgData.songs[0].al.picUrl,
      songDuration,
      pageShowSongDuration
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
    let { bgcUrl, mp3Url, songInfo } = this.data
    //退出后  设置继续播放
    backgroundAudioManager.title = songInfo.songName
    backgroundAudioManager.singer = songInfo.author
    backgroundAudioManager.src = mp3Url
    backgroundAudioManager.coverImgUrl = bgcUrl

    //让通知栏的播放暂停的状态跟页面的播放暂停保持一致
    this.playMP3()
    this.playMP3()
    console.log(backgroundAudioManager, 'backgroundAudioManager');
  },

  //播放
  playMP3() {
    //进入页面后自动播放
    // let { bgcUrl, mp3Url, songInfo } = this.data
    //退出后  设置继续播放
    // backgroundAudioManager.title = songInfo.songName
    // backgroundAudioManager.singer = songInfo.author
    // backgroundAudioManager.src = mp3Url
    // backgroundAudioManager.coverImgUrl = bgcUrl
    this.setData({
      defaultPlay: !this.data.defaultPlay
    })
    let { defaultPlay } = this.data
    defaultPlay ? this.MP3Start() : this.MP3Stop()

  },
  //播放
  MP3Start() {
    backgroundAudioManager.play();
    backgroundAudioManager.onPlay(() => {
      console.log('开始播放'); this.setData({
        defaultPlay: true
      })
    })
  },
  //暂停
  MP3Stop() {
    backgroundAudioManager.pause();
    backgroundAudioManager.onPause(() => {
      console.log('暂停播放');
      this.setData({
        defaultPlay: false
      })
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
  handleChangeSongTimeStart(e: any) {
    console.log(e, 'handleChangeSongTimeStart')
  },
  //移动播放位置
  handleChangeSongTime(e: any) {
    let { offsetLeft } = e.target
    const query = wx.createSelectorQuery();
    query.select("#progress-no-play").boundingClientRect()
    query.exec(res => {
      console.log(res, offsetLeft, e.touches[0])
      let width = res[0].width
      let left = e.touches[0].clientX - res[0].left
      let lastWidth = 0
      //百分比
      let progeressBarPercentage = ""
      if (left >= width) {
        lastWidth = width
      } else if (left < 0) {
        lastWidth = 0
      } else {
        lastWidth = left
      }

      //计算百分比
      if (left >= 0 && left <= width) {
        progeressBarPercentage = (left / width * 100).toFixed(4) + '%'
      } else if (left <= 0) {
        progeressBarPercentage = "0%"
      } else {
        progeressBarPercentage = "100%"
      }
      let decimal = Number(progeressBarPercentage.split("%")[0])
      console.log(width, left, lastWidth, progeressBarPercentage, this.data.songDuration / 100 * decimal)
      let songPlayDuration = formatTimeToMinutesAndSeconds(this.data.songDuration / 100 * decimal)
      //总时长 * 百分比
      let currentPosition = this.data.songDuration * Number(progeressBarPercentage.split("%")[0]) /1000 / 100
      backgroundAudioManager.seek(currentPosition)
      this.setData({
        ballMoveWidth: lastWidth,
        progeressBarPercentage,
        songPlayDuration
      })
    })
    // console.log(offsetLeft)
  },

  //进度条指定播放位置
  handleClickPlay(e: any) {
    console.log(e)
    let { clientX } = e.touches[0]
    const query = wx.createSelectorQuery();
    query.select("#progress-no-play").boundingClientRect()
    query.exec(res => {
      let progressWidth = res[0].width
      let left = res[0].left
      let progeressBarPercentage = ((clientX - left) / progressWidth * 100).toFixed(4) + '%'
      console.log(clientX - left, progeressBarPercentage)
      let decimal = Number(progeressBarPercentage.split("%")[0])
      let songPlayDuration = formatTimeToMinutesAndSeconds(this.data.songDuration / 100 * decimal)
      
      //总时长 * 百分比
      let currentPosition = this.data.songDuration * Number(progeressBarPercentage.split("%")[0]) /1000 / 100
      backgroundAudioManager.seek(currentPosition)
      // console.log(this.data.songDuration/1000,progeressBarPercentage,currentPosition,'n')
      this.setData({
        ballMoveWidth: clientX - left,
        progeressBarPercentage,
        songPlayDuration
      })
    })


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

  },
})
