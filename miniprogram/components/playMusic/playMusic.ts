// components/playMusic.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isStart: false, //当前播放状态  默认关闭
    currentPalySong: {},//当前播放音乐
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击播放暂停
    handleClickMusic() {
      let isStart = !this.data.isStart
      this.setData({
        isStart
      })
    }
  }
})
