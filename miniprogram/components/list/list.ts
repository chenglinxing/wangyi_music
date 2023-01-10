// components/list.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击header-opreation
    handleClickHeaderOpreation() {
      wx.showToast({
        title: "已经加急了~",
        icon: "none"
      })
    },

    //店家song-item
    hanldleClickSongItem(e) {
      let { songitem } = e.currentTarget.dataset
      console.log(songitem);
      //type=0推荐歌单  type=1新歌
      if (songitem.type === 1) {
        wx.navigateTo({
          url: `../song/index?songId=${songitem.id}&author=${songitem.singer}&songName=${songitem.songName}`
        })
      }else{
        //跳转歌单详情页
      }

    }
  }
})
