export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}


//转换数字 例如 1234567 转换成123万
export const transformNumber = (num: number) => {
  let res: any = 0
  //判断数字的长度（只能传入正整数）
  let numLen = num.toString().length
  if (numLen < 6) {
    res = num
  } else {
    res = num.toString().substring(0, numLen - 4) + '万'
  }
  return res
}

//格式化时间 转成分秒
/**
 * 
 * @param time 传入的时间 为毫秒或秒（isSecond=true）
 * @param isSecond 传入的是否为秒 默认为毫秒 则为false
 */
export const formatTimeToMinutesAndSeconds = (time: number, isSecond: boolean = false) => {
  //转成秒
  const seconds = isSecond ? time : time / 1000;
  //转成分钟
  const minute = Math.floor(seconds / 60)
  //获取剩下的秒
  const lastSeconds = Math.floor((seconds - minute * 60))
  //默认拼装成分钟:秒 例如 02:20
  let leftMinute: string = formatSeconds(minute)
  let rightSecond: string = formatSeconds(lastSeconds)
  let minuteSecond = leftMinute + ":" + rightSecond
  return minuteSecond
}

const formatSeconds = (num: number) => {
  let res: string = ""
  if (num == 0) {
    res = "00"
  } else if (num > 0 && num < 10) {
    res = "0" + num
  } else {
    res = `${num}`
  }
  return res
}