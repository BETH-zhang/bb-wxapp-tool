// scan.js
// 移动动画
let animation = wx.createAnimation({});
// 提示音
// let innerAudioContext = wx.createInnerAudioContext()
// innerAudioContext.src = '/images/sweep.wav'

Page({
  data: {
    
  },
  onLoad: function () {
    
  },
  onShow(){
    this.donghua()
  },
  donghua(){
    var that = this;
    // 控制向上还是向下移动
    let m = true
	
    setInterval(function () {
      if (m) {
        animation.translateY(250).step({ duration: 3000 })
        m = !m;
      } else {
        animation.translateY(-10).step({ duration: 3000 })
        m = !m;
      }

      that.setData({
        animation: animation.export()
      })
    }.bind(this), 3000)

    if (!this.data.attendSuccessImg) {
      this.takePictures()
    }
  },
  scancode(e){
    // 提示音
    // innerAudioContext.play()
    // 校验扫描结果，并处理
    console.log(1, e)
    let res = e.detail.result
    console.log('res: ', res)
    
    // wx.scanCode({
    //   success: function(res) {
    //     console.log('???', res)
    //   },
    // })
  },
  takePictures: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
     // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        that.setData({
          attendSuccessImg: tempFilePaths[0]
        });

        // 上传图片
        //判断机型
        var model = "";
        wx.getSystemInfo({
          success: function (res) {
            var that = this;
            model = res.model;
          }
        })
        if (model.indexOf("iPhone") <= 0) {
          // that.uploadFileOpt(that.data.attendSuccessImg);
          console.log(111111)
        } else {
          drawCanvas();

        }

        // 缩放图片
        function drawCanvas() {
          const ctx = wx.createCanvasContext('attendCanvasId');
          ctx.drawImage(tempFilePaths[0], 0, 0, 94, 96);
          ctx.draw();
          that.prodImageOpt();
        }
      }
    });
  },

  // 生成图片
  prodImageOpt: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'attendCanvasId',
      success: function success(res) {
        that.setData({
          canvasImgUrl: res.tempFilePath
        });
        // 上传图片
        that.uploadFileOpt(that.data.canvasImgUrl);
      },
      complete: function complete(e) {
      }
    });
  },

})