var config = require('../../utils/config.js').default;

// 获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎来到前端秘密花园！',
    userInfo: {},
    grids: config.menuData,
  },
  // 事件处理函数
  bindViewTap: function () {
    console.log('1');
    wx.navigateTo({
      url: '../yuedu/yuedu'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    // 调用应用实例的方法获取全局数据
    // 该接口即将废弃
    // app.getUserInfo(function (userInfo) {
    //   // 更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  }
})
