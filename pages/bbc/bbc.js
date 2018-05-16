var util = require('../../utils/util.js');
var config = require('../../utils/config.js').default;
var listData = require('./data.js').default;

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: listData.data,
    index: -1,

    imgUrls: [],
    // 轮播属性
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  // 事件处理函数
  queryItemClick: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({ index: this.data.index !== index ? index : -1 });
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

  },

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
