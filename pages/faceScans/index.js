// scan.js
// 移动动画
let animation = wx.createAnimation({});

function loopVoice(src, totaltimes) {
  let maxtimes = totaltimes === 'loop' ? 10000 : totaltimes
  let secondIAC = wx.createInnerAudioContext()
  secondIAC.obeyMuteSwitch = false
  secondIAC.onError(() => {
    showToast({
      icon: 'none',
      title: '加载失败',
    })
  })
  let times = 0
  secondIAC.src = src
  secondIAC.onPlay(() => {
    times++
  })
  secondIAC.onEnded(() => {
    // if (times === maxtimes) {
    //   secondIAC.destroy()
    // }
    // secondIAC.src = src
    console.log(times, maxtimes)
    if (times >= maxtimes) {
      // 不循环播放了
    } else {
      secondIAC.play()
    }
  })
  secondIAC.play()

  return secondIAC
}

Page({
  data: {
    
  },
  onLoad: function () {
    
  },
  onShow(){
    var that = this
    this.donghua()
    console.log(111)

    setTimeout(function() {
      that.takePhoto()
    }, 3000)
    this.audioEle = loopVoice('/images/sweep.wav', 5)
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
  },
  scancode(e){
    // 校验扫描结果，并处理
    console.log(1, e)
    let res = e.detail.result
    console.log('res: ', res)
  },
  takePhoto() {
    // 提示音结束
    console.log(this.audioEle)
    this.audioEle.pause()

    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log('res: ', res)
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  }, 
})