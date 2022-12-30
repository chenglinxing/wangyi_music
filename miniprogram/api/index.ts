import {
  service
} from "../service/service"

//获取首页banner图
export const getHomeBanner = (type: any) =>
  service({
    method: 'get',
    requestUrl: "/banner",
    data: {
      type
    }
  })

//获取热门歌单
export const getHotSongSheet = () =>
  service({
    requestUrl: '/playlist/hot',
    method: 'get'
  })