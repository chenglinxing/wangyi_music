import {
  service
} from "../service/service"

//获取首页banner图
export const getHomeBanner = (type:any) =>
  service({
    method: 'get',
    url: "http://60.205.95.118:3000/banner",
    data: {
      type
    }
  })