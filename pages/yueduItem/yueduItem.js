var util = require('../../utils/util.js');
//在使用的View中引入WxParse模块
var WxParse = require('../../wxParse/wxParse.js');

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    isLoading: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.MenuPannel();

    var me = this;
    me.setData({ isLoading: true });
    var number = this.options.number || 5;
    util.get({
      url: 'https://api.github.com/repos/BETH-zhang/yuedu/issues/' + number,
      success: function(res) {
        var content = res.data;
        content.updated_at = util.dateFormat(content.updated_at, 'l');
        // content.article = app.towxml.toJson(content.body, 'markdown');
        WxParse.wxParse('article', 'markdown', content.body, me, 5);
        me.setData({ content, isLoading: false });
      },
    });
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
