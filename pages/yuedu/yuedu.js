var util = require('../../utils/util.js');

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isLoading: false,
  },
  queryItemClick: function(e) {
    var number = e.currentTarget.dataset.number;
    wx.navigateTo({
      url: '/pages/yueduItem/yueduItem?number=' + number,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    me.setData({ isLoading: true });
    util.get({
      url: 'https://api.github.com/repos/BETH-zhang/yuedu/issues?filter=created&page=1&per_page=15',
      success: function(res) {
        var list = res.data.map((item) => {
          item.updated_at = util.dateFormat(item.updated_at, 'l');
          // item.article = app.towxml.toJson(item.body, 'markdown');
          item.article = item.body
          return item;
        });
        me.setData({ list, isLoading: false });
        console.log(list);
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
