import {
  service
} from "../service/service"
import { ISongListParams } from "./type"

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

//搜索歌词
//type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
export const getSearchData = (keywords: any, type = 1, limit = 10) =>
  service({
    requestUrl: `/search?keywords=${keywords}&type=${type}&limit=${limit}`,
    method: 'get'
  })

//获取歌词
export const getSongLyric = (id: any) =>
  service({
    requestUrl: `/lyric?id=${id}`,
    method: 'get'
  })

//获取MP3
export const getSongMP3 = (id: any) =>
  service({
    requestUrl: `/song/url?id=${id}`,
    method: 'get'
  })

//获取歌曲详情
export const getSongDetail = (id: any) =>
  service({
    requestUrl: `/song/detail?ids=${id}`,
    method: 'get'
  })

//获取热搜榜的歌
export const getRecommandSong = () =>
  service({
    requestUrl: "/personalized/newsong",
    method: 'get'
  })

//获取热搜榜的歌
export const getHotDetail = () =>
  service({
    requestUrl: "/search/hot/detail",
    method: 'get'
  })

//获取歌单详情
export const getSongListDetailById = (songListParams: ISongListParams) =>
  service({
    requestUrl: `/playlist/track/all?id=${songListParams.id}&?limit=${songListParams.limit}&?offset=${songListParams.offset}`,
    method: 'get'
  })

//获取新歌
export const getNewSong = (type = 0) =>
  service({
    requestUrl: "/top/song?type=" + type
  })

// 获取推荐歌单
export const getPersonalized = (limit: number = 6) =>
  service({
    requestUrl: "/personalized?limit=" + limit
  })