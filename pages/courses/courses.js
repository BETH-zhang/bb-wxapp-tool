//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    banner:{
      delay:3000,
      timeoutProcess:null,
      currindex:0,
      bannerimg:[{
        navigator: '',
        imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af13d34aa1cb.jpg'
      }, {
          imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af8f690844d2.png'
      }]
    },
    nav:[{
      navigator: '../course/course',
      imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af3eb3a6c39f.jpg',
      title: '微专业'
    }, {
        navigator: '../mystudy/mystudy',
        imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af3eb3a6c39f.jpg',
        title: '互联网'
    }, {
        imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af3eb3a6c39f.jpg',
        title: '设计创作'
    }, {
        imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af3eb3a6c39f.jpg',
        title: '兴趣生活'
    }],
    ad:[{
      imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af3eb3a6c39f.jpg'
    }, {
        imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af3eb3a6c39f.jpg'
    }, {
        imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af3eb3a6c39f.jpg'
    }],
    course_grp:[{
      title: {
        left: 'IT/互联网',
        right: '更多'
      },
      courses: [{
        imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af13d34aa1cb.jpg',
        title: 'IT／互联网之道',
        price: '20'
      }, {
        imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af13d34aa1cb.jpg',
        title: 'IT／互联网之道',
        price: '20'
        }, {
          imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af13d34aa1cb.jpg',
          title: 'IT／互联网之道',
          price: '20'
      }, {
        imgurl: 'https://static.leiphone.com/uploads/new/article/pic/201805/5af13d34aa1cb.jpg',
        title: 'IT／互联网之道',
        price: '20'
        }]
    }],
    moreCourses:{
      title:"已经到底，查看更多课程 >",
      url:"../course/course"
      },
    userInfo: {}
  },
  /*点击banner上的圆选择相应的图片 */
  bindStlBanner:function(e){
    console.log(e);
    var that = this;
    var bannerIdx = e.currentTarget.dataset.index;
      clearTimeout(that.data.banner.timeoutProcess);
      that.changeBanner(bannerIdx);
      that.data.banner.timeoutProcess = setInterval(that.timetochange,3000);
  },
  onLoad: function () {
    console.log('onLoad index')
    wx.request({
      url: 'https://api.getweapp.com/vendor/ketang/index',
      success: (res) => {
        console.log(res.data)
        const bannerArr = res.data.bannerSrc.banner
        const navArr = res.data.navSrc.nav
        const adArr = res.data.adSrc.ad
        const courseGrp = res.data.courseSrc.course_grp
         this.setData({
        banner:{
          currindex:0,
          bannerimg:bannerArr
        },
        nav:navArr,
        ad:adArr,
        course_grp:courseGrp
      });
      }
    })
    var that = this;
   
    that.changeBanner(0);
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    console.log(that.data);
  },
  onShow:function(){
    console.log("onshow index");
    var that = this;
    that.data.banner.timeoutProcess = setInterval(that.timetochange,3000);
    console.log(that.data);
  },
  onHide:function(){
    var that=this;

    clearTimeout(that.data.banner.timeoutProcess);
  },
  /**根据bannerArray的index显示 */
  changeBanner:function(index){
    var that = this,
        banner = that.data.banner,
        currindex = banner.currindex;

      if(banner.bannerimg[currindex])
    banner.bannerimg[currindex].class ='';
    if(banner.bannerimg[index])
    banner.bannerimg[index].class = 'active';
    banner.currindex = index;
    that.setData({
    "banner":banner
    });
    //showImg  todo
  },
  /*轮播banner */
  timetochange:function(){
    var that = this,
        banner = that.data.banner,
        currindex = banner.currindex;
        if(currindex < banner.bannerimg.length - 1)
        {
          currindex ++;
        }else{
          currindex = 0;
        }
        that.changeBanner(currindex);
  }
})
