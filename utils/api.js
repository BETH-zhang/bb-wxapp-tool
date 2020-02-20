/** 使用方法
 *@method ajax
 *@param{参数类型}参数名 参数说明
 * Type：请求类型（get、post）
 * params：请求参数
 * url：请求地址
 */
 
// http('dataUrl', param).then(res => {
//       ...
//     })
const ajax = (Type, params, url) => {
    var methonType = "application/json";
    var https = ""
    var st = new Date().getTime()
    if (Type == "POST") {
      methonType = "application/x-www-form-urlencoded"
    }
    return new Promise(function (resolve, reject) {
      wx.request({
        url: https + url,
        method: Type,
        data: params,
        header: {
          'content-type': methonType,
          'Muses-Timestamp': st,
          'version': 'v1.0' // 版本号
          // 'Muses-Signature': sign
        },
        success: function (res) {
          // if (res.statusCode != 200) {
          //   reject({ error: '服务器忙，请稍后重试', code: 500 });
          //   return;
          // }
          // resolve(res.data);
          wx.hideLoading()
          console.log(res)
          if (res.data.status == 200) {
            resolve(res.data);
          } else if (res.data.status == 400) {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1000
            })
            return
          } else if (res.data.status == 401){
            wx.removeStorageSync('phone')
            wx.removeStorageSync('token')
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1000,
              success:function(){
                wx.navigateTo({
                  url: '../login/index',
                })
              }
            })
            return
          } else {
            //错误信息处理
            wx.showToast({
              title: '服务器错误，请联系客服',
              icon: 'none',
              duration: 1000
            })
          }
        },
        fail: function (res) {
          // fail调用接口失败
          reject({ error: '网络错误', code: 0 });
        },
        complete: function (res) {
          // complete
        }
      })
    })
  }
   
  module.exports = {
    ajax: ajax
  }