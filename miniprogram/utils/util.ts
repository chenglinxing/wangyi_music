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