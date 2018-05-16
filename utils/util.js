const moment = require('moment.min.js');
moment.locale('en', {
  longDateFormat: {
    l: "YYYY-MM-DD",
    L: "YYYY-MM-DD HH:mm"
  }
});

export const dateFormat = function(log, rule) {
  return moment(log).format(rule || 'L');
}

export const getRandomColor = function () {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

/**
 * 时间秒数格式化
 * @param s 时间戳（单位：秒）
 * @returns {*} 格式化后的时分秒
 */
export const secToTime = function (log) {
  var s = Math.floor(log);
  var t;
  if (s > -1) {
    var hour = Math.floor(s / 3600);
    var min = Math.floor(s / 60) % 60;
    var sec = s % 60;
    if (hour >= 10) {
      t = hour + ":";
    } else if (hour < 10 && hour > 0 ) {
      t = '0' + hour + ":";
    } else {
      t = '';
    }

    if (min < 10) { t += "0"; }
    t += min + ":";
    if (sec < 10) { t += "0"; }
    t += sec;
  }
  return t;
}

export const get = function({ url, data, success }) {
  wx.request({
    url,
    header: {
      "Content-Type": "application/json"
    },
    data: data || {},
    success,
  })
}

// 超过5个请求会出发小程序的限时
export const queue = function(fns, count) {
  return new Promise(function (resolve, reject) {
    let a = fns.slice(0, count)
    let b = fns.slice(count)
    let l = fns.length
    let runs = 0
    if (fns.length == 0) return resolve()
    for (let fn of a) {
      fn().then(() => {
        runs += 1
        if (runs == l) return resolve()
        let next = function () {
          let fn = b.shift()
          if (!fn) return
          return fn().then(() => {
            runs += 1
            if (runs == l) return resolve()
            return next()
          }, reject)
        }
        return next()
      }, reject)
    }
  })
}