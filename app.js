import { MenuPannel } from './component/menu/menu.js';
const Towxml = require('./towxml/index'); //引入towxml库

App({
  MenuPannel,
  
  onLaunch: function () {
    // 调用 API 从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  // towxml: new Towxml(),
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      // 调用登录接口
      // wx.login({
      //   success: function () {
      //     wx.getUserInfo({
      //       success: function (res) {
      //         that.globalData.userInfo = res.userInfo;
      //         typeof cb == "function" && cb(that.globalData.userInfo)
      //       }
      //     })
      //   }
      // });
    }
  },
  globalData: {
    userInfo: null
  }
})
