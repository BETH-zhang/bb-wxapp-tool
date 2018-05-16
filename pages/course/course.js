// pages/course/course.js
Page({
  data:{
    courses:[{
      title: 'IT／互联网',
      active: 'true',
      category: {
        ad: [{
          imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af13d34aa1cb.jpg'
        }],
        item: [{
          title: '基础语言',
          stdCourse: [{
            title: '全部',
          }, {
            title: 'Java'
          }, {
            title: 'C'
          }, {
            title: 'Python'
          }, {
            title: 'Javascript'
          }, {
            title: 'C＋＋'
          }]
        }, {
          title: '基础语言',
          stdCourse: [{
            title: '全部',
          }, {
            title: 'Java'
          }, {
            title: 'C'
          }, {
            title: 'Python'
          }, {
            title: 'Javascript'
          }, {
            title: 'C＋＋'
          }]
          }, {
            title: '基础语言',
            stdCourse: [{
              title: '全部',
            }, {
              title: 'Java'
            }, {
              title: 'C'
            }, {
              title: 'Python'
            }, {
              title: 'Javascript'
            }, {
              title: 'C＋＋'
            }]
        }, {
          title: '基础语言',
          stdCourse: [{
            title: '全部',
          }, {
            title: 'Java'
          }, {
            title: 'C'
          }, {
            title: 'Python'
          }, {
            title: 'Javascript'
          }, {
            title: 'C＋＋'
          }]
          }, {
            title: '基础语言',
            stdCourse: [{
              title: '全部',
            }, {
              title: 'Java'
            }, {
              title: 'C'
            }, {
              title: 'Python'
            }, {
              title: 'Javascript'
            }, {
              title: 'C＋＋'
            }]
          }]
      },
    }, {
      title: '微信小程序'
    }, {
      title: '前端开发'
    }, {
      title: '后端开发'
    }, {
      title: '精品课堂'
    }]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("onLoad");

    wx.request({
      url:'https://api.getweapp.com/vendor/ketang/course',
      success: (res) => {
        this.setData({
      courses: res.data.courses
    });
      }
    })
    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  selectTab:function(e){
    var that = this,
        index = e.currentTarget.dataset.index,
        coursesArr = that.data.courses;
    console.log("selectTab  ");
    console.log(coursesArr[0].active);
    console.log(e);
    for(var  i = 0;i < coursesArr.length; i++ ){
      coursesArr[i].active = "";//false
    }
      coursesArr[index].active = "true";
      that.setData({courses:coursesArr});
  }
})