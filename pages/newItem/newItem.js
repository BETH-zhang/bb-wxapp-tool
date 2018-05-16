var util = require('../../utils/util.js');
var config = require('../../utils/config.js').default;
//在使用的View中引入WxParse模块
var WxParse = require('../../wxParse/wxParse.js');

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    isLoading: false,

    content: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.MenuPannel();

    var me = this;
    var index = this.options.index || 0;
    me.setData({ isLoading: true });
    var url = 'http://api01.bitspaceman.com:8000/post/leifeng?apikey=' + config.apiKey + '&kw=' + config.kw + '&pageToken=' + config.pageSize;
    util.get({
      url,
      success: function (res) {
        const content = res.data.data[index] ? res.data.data[index] : {};
        WxParse.wxParse('article', 'html', content.content, me, 5);
        me.setData({
          isLoading: false,
          content,
        });
      },
    });
  },
})
