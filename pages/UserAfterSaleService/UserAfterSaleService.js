Page({
  data: {


    leftimgs: "http://pa8ytgis2.bkt.clouddn.com/btn_left.png",
    reightimgs: "http://pa8ytgis2.bkt.clouddn.com/btn_right.png",

    swiperdata: [{}],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    swiperIndex: 0,
    AddswiperIndex: 0,

    //  用于接受数组长度
    SwiperdataLength: '',


    /********进度条************ */
    progress_txt: '正在匹配中...',
    // count: 0, // 设置 计数器 初始为0
    // countTimer: null, // 设置 定时器 初始为null
    text1: '加',
    text2: '',
    text3: '载中...',
    text4: 'Login。。。',
    swiperdata: [{}],
    applyDate: '',
    bottomData: '',
    YeMianData: '',


    Deviceindex: 0
  },

  /****************************按钮点击方法区************************** */



  swiperChange: function (e) {
    var that = this;
    that.setData({
      AddswiperIndex: e.detail.current,
      // cityWaterQuality: this.data.swiperdata[this.data.swiperIndex].levelName
      bottomData: this.data.swiperdata[e.detail.current].status

    })

    // getApp().globalData.applydeviceId = this.data.swiperdata[this.data.swiperIndex].applyDeviceId
    console.log("current 改变时会触发 下标为：" + e.detail.current)
    // console.log("获取数组长度-------" + this.data.swiperdata.length)
    // console.log("滑动后的数组值--------：" + this.data.swiperdata[e.detail.current].dateCreated)

  },


  onLoad: function (options) {
    console.log("============" + getApp().globalData.UserErWeiMaId)
  },





  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("onShareAppMessage")
  },
  /*****************下拉刷新******************* */


  onPullDownRefresh: function () {

  },


  // 页面展示时
  onShow: function () {
    console.log("onShow----------" + this.data.count + "============SW----" + this.data.AddswiperIndex)
    if (getApp().globalData.UserStatus == 3100) {

    } else if (getApp().globalData.UserStatus == 3102) {

    } else if (getApp().globalData.UserStatus == 3103) {

    } else {
      this.GetHttpAfterSaleService();
    }

    // if (this.data.count == 0) {
    //   this.drawProgressbg();
    //   // this.drawCircle(2)
    //   this.countInterval();
    // }

  },

  onHide: function () {
    // console.log(this.data.count)
    // this.setData({
    //   count: 0,
    //   text1: '加',
    //   text2: '',
    //   text3: '载中...',
    //   text4: 'Login。。。'
    // })
  },
  /******************圆形进度条****************** */
  // drawProgressbg: function() {
  //   // 使用 wx.createContext 获取绘图上下文 context
  //   var ctx = wx.createCanvasContext('canvasProgressbg')
  //   ctx.setLineWidth(10); // 设置圆环的宽度
  //   ctx.setStrokeStyle('#ffffff'); // 设置圆环的颜色
  //   ctx.setLineCap('round') // 设置圆环端点的形状
  //   ctx.beginPath(); //开始一个新的路径
  //   ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
  //   //设置一个原点(100,100)，半径为90的圆的路径到当前路径
  //   ctx.stroke(); //对当前路径进行描边
  //   ctx.draw();

  // },
  // drawCircle: function(step) {
  //   var context = wx.createCanvasContext('canvasProgress');
  //   // 设置渐变
  //   var gradient = context.createLinearGradient(200, 100, 100, 200);
  //   // gradient.addColorStop("0", "#4A97D2");
  //   // gradient.addColorStop("0.5", "#3681C4");
  //   // gradient.addColorStop("1.0", "#3681C4");

  //   context.setLineWidth(12);
  //   context.setStrokeStyle(gradient);
  //   context.setLineCap('round')
  //   context.beginPath();
  //   // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
  //   context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
  //   context.stroke();
  //   context.draw()
  // },
  // countInterval: function() {
  //   // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
  //   this.countTimer = setInterval(() => {
  //     if (this.data.count <= 60) {
  //       /* 绘制彩色圆环进度条  
  //       注意此处 传参 step 取值范围是0到2，
  //       所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
  //       */
  //       this.drawCircle(this.data.count / (60 / 2))

  //       this.data.count++;
  //       // console.log(this.data.count)
  //     } else {

  //       this.setData({
  //         text1: '剩余',
  //         text2: '180',
  //         text3: '天',
  //         text4: '使用中'
  //       });
  //       clearInterval(this.countTimer);
  //       // console.log(this.data.count)
  //     }
  //   }, 60)
  // },


  /********************按键点击事件************************* */
  GoToUserApplicationEquipment: function () {
    console.log(this.data.swiperdata[this.data.AddswiperIndex].orderId)

    console.log("==============getApp().globalData.UserStatus==========" + getApp().globalData.UserStatus)
    if (getApp().globalData.UserStatus == 3100) {
      wx.showToast({
        title: '请先晋升为代理',
        icon: 'none',
      })
    } else if (getApp().globalData.UserStatus == 3102) {
      wx.showToast({
        title: '请先晋升为代理',
        icon: 'none',
      })
    } else if (getApp().globalData.UserStatus == 3103) {
      wx.showToast({
        title: '请先晋升为代理',
        icon: 'none',
      })
    } else {
      wx.navigateTo({
        url: '../UserApplicationEquipment/UserApplicationEquipment',
      })
    }

  },





  // 设备网络数据
  GetHttpAfterSaleService: function () {
    var that = this;
    wx.request({
      url: 'https://japi.waterever.cn/device/device_home',
      header: {
        Authorization: getApp().globalData.token,
        // 'content-type': 'application/json' // Get默认值
        "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      method: "POST",
      data: {
        id: getApp().globalData.UserId,
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.data)
        if (res.data.code == 0) {
          if (res.data.data == null) {
            // wx.navigateTo({
            //   url: '../UserApplicationEquipment/UserApplicationEquipment',
            // })
            that.setData({
              YeMianData: res.data.data
            })


          } else {

            res.data.data.push({
              status: 10085,
              applyDate: 10086
            })
            that.setData({
              text1: '剩余',
              text3: '天',
              swiperdata: res.data.data,
              bottomData: res.data.data[that.data.AddswiperIndex].status,
              SwiperdataLength: res.data.data.length
            })
          }
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }


      }

    })
  }


  ,
  ReightimgsBtn: function () {

    var that = this;

    if (that.data.AddswiperIndex < that.data.SwiperdataLength - 1) {
      that.setData({
        AddswiperIndex: that.data.AddswiperIndex += 1
      })
    } else {
      that.setData({
        AddswiperIndex: that.data.SwiperdataLength - 1
      })
    }
    console.log(that.data.AddswiperIndex)
    console.log(that.data.SwiperdataLength)
  },


  LeftBtn: function () {
    var that = this;


    if (that.data.AddswiperIndex == 0) {
      that.setData({
        AddswiperIndex: 0
      })
    } else if (that.data.AddswiperIndex > 0) {
      that.setData({
        AddswiperIndex: that.data.AddswiperIndex -= 1
      })
    } else {

    }
    console.log(that.data.AddswiperIndex)
    console.log(that.data.SwiperdataLength)
  },


  // 一键激活
  goToDevice: function () {
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log("=======扫码结果======" + res.result)
        var resultstr = res.result;
        var overnum = resultstr.replace('http://a.app.qq.com/o/simple.jsp?pkgname=com.nbappdev.water&deviceid=', '')
        console.log("=======扫码截取结果======" + overnum + "=========orderId_ID===========" + this.data.swiperdata[this.data.AddswiperIndex].orderId);




        wx.request({
          url: 'https://japi.waterever.cn/device/device_binding',
          header: {
            Authorization: getApp().globalData.token,
            // 'content-type': 'application/json' // Get默认值
            "Content-Type": "application/x-www-form-urlencoded" //POST默认值
          },
          method: "POST",
          data: {
            id: this.data.swiperdata[this.data.AddswiperIndex].orderId,
            code: overnum
          },
          success: function (res) {
            console.log(res)
            console.log(res.data)
            if (res.data.code == 0) {
              console.log(res.data.msg)
              wx.showModal({
                title: '提示',
                content: '设备激活成功',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')

                  } else if (res.cancel) {
                    console.log('用户点击取消')

                  }
                }
              })
            } else {

              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }




          }

        })







        //   // 向下一个页面传递扫码成功的参数
        // wx.redirectTo({
        //   url: '../device/device?qucodeData=' + overnum,
        // })
      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败',
          icon: 'none',
          duration: 2000
        })
      }
    })

  },

  GoToUserApplicationEquipmentNext: function () {
    console.log(this.data.swiperdata[this.data.AddswiperIndex].orderId)


    wx.navigateTo({
      url: '../UserApplicationEquipmentNext/UserApplicationEquipmentNext?OrderId=' + this.data.swiperdata[this.data.AddswiperIndex].orderId,
    })
  }



})