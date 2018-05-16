// pages/scroll/scroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTo: 0,
    menu: ['户型分析', '装修标准', '社区品质', '物业服务', '区域配置', '不利因素'],
    content: [
      '户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析',
      '户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析',
      '户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析',
      '户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析',
      '户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析',
      '户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析户型分析',
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  clickMenu: function(e) {
    var num = e.currentTarget.dataset.index;
    console.log(num);
    this.setData({
      scrollTop: num * 30,
    });
  },

  clickTap: function() {
    var _this = this;
    if (typeof setdsq != null) {
      clearInterval(setdsq);
    }
    let scrollTops = num * ONEHEIGHT;
    let oldTops = _this.data.scrollTo;
    if (oldTops < scrollTops) {//初始化滚动高度和目前滚动高度做对比
      var scrollnum = (scrollTops - oldTops) / 10;//每50毫秒增加减少的数量
      var setdsq = setInterval(function () {
        oldTops += scrollnum;
        if (oldTops < scrollTops) {
          _this.setData({ scrollTo: oldTops })
        } else {
          clearInterval(setdsq)
        }
      }, 50)
    } else {
      var scrollnum = (oldTops - scrollTops) / 10;
      var setdsq = setInterval(function () {
        oldTops -= scrollnum;
        if (scrollTops < oldTops) {
          _this.setData({ scrollTo: oldTops })
        } else {
          clearInterval(setdsq)
        }
      }, 50)
    }
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