// pages/video/video.js
var util = require('../../utils/util.js');
var listData = require('./data.js').default;
console.log(listData);

var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: listData.data,

    src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    src1: '../../images/data/video.mp4',
    danmuList: [
      // {
      //   text: '第 1s 出现的弹幕',
      //   color: '#ff0000',
      //   time: 1
      // },
      // {
      //   text: '第 3s 出现的弹幕',
      //   color: '#ff00ff',
      //   time: 3
      // }
    ],
  },

  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },

  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },

  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: util.getRandomColor()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.MenuPannel();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})