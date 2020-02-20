// pages/idcard/index.js
// const util = require('../../utils/util.js');
// const qiniuUploader = require("../../utils/qiniuUploader");
// import api from '../../utils/api.js';
const apiurl = '';
const imgPath = '';
 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    x: 0,
    y: 0,
    areaWith: 750,
    areaHeight: 750,
    idCardUrlFront: '/images/front.png',
    idCardUrlBack: "/images/back.png",
    imagewidth: '',
    imageheight: '',
    base64: '',
    islogo:false,
    headerImage: '',
    picValue: '',
    showMagnifyIdCard: false,
    hasServerMsg: false,
    auth: {},
    // android: util.browser.versions.android
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // helper.checkOrientation('judgeCanvas');
  },
  uploadImageFront() {
    var that = this
    // front 代表正面
    that.checkIdCard(that, 'front', function(res) {
      wx.setStorageSync('address', res.address)
      wx.removeStorageSync('cardErrFront')
      wx.setStorage({
        key: 'idcardFront',
        data: {
          address: res.address,
          birthday: res.birthday,
          code: res.code,
          name: res.name,
          nation: res.nation,
          sex: res.sex,
        }
      })
      that.checkIsSuc()
    })
  },
  uploadImageBack() {
    var that = this
     // back 代表反面
    that.checkIdCard(that, 'back', function(res) {
      wx.setStorageSync('issue', res.issue)
      wx.removeStorageSync('cardErrBack')
      wx.setStorage({
        key: 'idcardBack',
        data: {
          expiryDate: res.expiryDate, // 结束日期
          issue: res.issue, //签发籍贯
          issueDate: res.issueDate, // 开始日期
        }
      })
      that.checkIsSuc()
    })
  },
  checkIsSuc() {
    var that = this
    var address = wx.getStorageSync('address')
    var issue = wx.getStorageSync('issue')
 
    if (address && issue) {
      that.setData({
        islogo: true
      })
    }
  },
  checkIdCard(that, type, callback) {
    // util.getUploadToken()
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log('tempFilePaths: ', tempFilePaths)

          if (type == "front") {
            that.setData({
              idCardUrlFront: tempFilePaths[0]
            })
            // 上传获取到远程地址
          } else {
            that.setData({
              idCardUrlBack: tempFilePaths[0]
            })
            // 上传获取到远程地址
          }

        // that.qiniuUploader(that, tempFilePaths[0], function(res) {
        //   console.log(res)
        //   if (type == "front") {
        //     that.setData({
        //       idCardUrlFront: imgPath + res.key
        //     })
        //     wx.setStorageSync('idCardFrontUrl', imgPath + res.key)
        //     that.uploadFile(that, type, tempFilePaths, that.data.idCardUrlFront, function(res) {
        //       console.log(res)
        //       callback(res)
        //     })
        //   } else {
        //     that.setData({
        //       idCardUrlBack: imgPath + res.key
        //     })
        //     wx.setStorageSync('idCardBackUrl', imgPath + res.key)
            
        //     that.uploadFile(that, type, tempFilePaths, that.data.idCardUrlBack, function(res) {
        //       console.log(res)
        //       callback(res)
        //     })
        //   }
        // })
 
        // that.getIdcardInfo('front')
      }
    })
  },
  /*图片上传*/
  uploadFile(that, idCardSide, files, idCardUrl, callback) {
    wx.uploadFile({
      url: apiurl + '/weixin/getIdcardInfo', //里面填写你的上传图片服务器API接口的路径 
      filePath: files[0], //要上传文件资源的路径 String类型 
      name: 'file', //按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
      header: {
        "Content-Type": "multipart/form-data" //记得设置
        // "Content-Type": "image/jpeg" //记得设置
      },
      formData: {
        //和服务器约定的token, 一般也可以放在header中
        'token': wx.getStorageSync('token'),
        'idCardSide': idCardSide,
        'idCardUrl': idCardUrl
      },
      success: function(res) {
        //当调用uploadFile成功之后，再次调用后台修改的操作，这样才真正做了修改头像
        console.log(JSON.parse(res.data))
        var responce = JSON.parse(JSON.parse(res.data).data)
 
        if (res.status = 200) {
          if (responce.code == 1) {
            callback(responce.result)
          } else {
            wx.showToast({
              title: responce.msg,
              icon: 'none',
              duration: 1000
            })
            if (idCardSide =="front"){
              wx.setStorageSync('cardErrFront', responce.msg)
            }else{
              wx.setStorageSync('cardErrBack', responce.msg)
            }
            return
          }
 
        } else {
          wx.showToast({
            title: responce.msg,
            icon: 'none',
            duration: 1000
          })
          return
        }
      }
    })
  },
  submit() {
    var address = wx.getStorageSync('address')
    var issue = wx.getStorageSync('issue')
    var cardErrFront = wx.getStorageSync('cardErrFront')
    var cardErrBack = wx.getStorageSync('cardErrBack')
    if(!this.data.islogo) return
    // debugger
    if (cardErrFront) {
      wx.showToast({
        title: '人像面'+cardErrFront+'，请重新上传',
        icon: 'none',
        duration: 1000
      })
      return
    } else if (cardErrBack){
      wx.showToast({
        title: '国徽面' + cardErrBack + '，请重新上传',
        icon: 'none',
        duration: 1000
      })
      return
    } else if (!address) {
      wx.showToast({
        title: '请上传身份证人像面',
        icon: 'none',
        duration: 1000
      })
      return
    } else if (!issue) {
      wx.showToast({
        title: '请上传身份证国徽面',
        icon: 'none',
        duration: 1000
      })
      return
    } else {
      wx.navigateTo({
        url: '../editcard/index',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.removeStorageSync('address')
    wx.removeStorageSync('issue')
    wx.removeStorageSync('cardErrFront')
    wx.removeStorageSync('cardErrBack')
    wx.removeStorage({
      key: 'idcardFront',
      success: function(res) {
        console.log(res)
      },
    })
    wx.removeStorage({
      key: 'idcardBack',
      success: function(res) {
        console.log(res)
      },
    })
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
 
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
 
  },
  
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
 
  }
})