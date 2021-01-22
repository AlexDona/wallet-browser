const date = Date
date.prototype.format = function (format) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) { format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)) }
  }
  return format
}

export const getDuration = val => {
  var duration
  var days = Math.floor(val / 86400)
  var hours = Math.floor((val % 86400) / 3600)
  var minutes = Math.floor(((val % 86400) % 3600) / 60)
  var seconds = Math.floor(((val % 86400) % 3600) % 60)
  if (days > 0) duration = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
  else if (hours > 0) duration = hours + '小时' + minutes + '分' + seconds + '秒'
  else if (minutes > 0) duration = minutes + '分' + seconds + '秒'
  else if (seconds > 0) duration = seconds + '秒'
  return duration
}
