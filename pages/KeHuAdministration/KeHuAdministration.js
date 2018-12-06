var QR = require("../../utils/qrcode.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*******二维码生成器************ */
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',
    placeholder: '',

    /*******二维码生成器************ */
    ArrayData: [{}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    console.log("========== getApp().globalData.SuperiorQrCode============" + getApp().globalData.SuperiorQrCode)
    console.log("==========  getApp().globalData.token============" + getApp().globalData.token)
    console.log("==========  getApp().globalData.UserId============" + getApp().globalData.UserId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    that.GetHttp();
    /*******二维码生成器************ */
    // 页面初始化 options为页面跳转所带来的参数
    var size = that.setCanvasSize(); //动态设置画布大小
    var initUrl = getApp().globalData.SuperiorQrCode;
    that.createQrCode(initUrl, "mycanvas", size.w, size.h);
    /*******二维码生成器************ */
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

  },
  /*******二维码生成器************ */
  //适配不同屏幕大小的canvas
  setCanvasSize: function() {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686; //不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width; //canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function(url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => {
      this.canvasToTempImage();
    }, 1000);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function() {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function(res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          // canvasHidden:true
        });
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },
  previewImg: function(e) {
    // var img = this.data.imagePath;
    // console.log('图片路径.....' + img);
    // wx.previewImage({
    //   current: img, // 当前显示图片的http链接
    //   urls: [img] // 需要预览的图片http链接列表
    // })

    // getApp().globalData.SuperiorQrCode = this.data.QrCode
    wx.navigateTo({
      url: '../PreviewImgPage/PreviewImgPage',
    })


  },




  GetHttp: function() {
    var that = this;
    wx.request({
      url: 'https://japi.waterever.cn/user/custom_data',
      header: {
        Authorization: getApp().globalData.token,
        'content-type': 'application/json' // Get默认值
        // "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      // method: "POST",
      data: {
        id: getApp().globalData.UserId
      },
      success: function(res) {
        console.log(res)
        console.log(res.data)
        console.log(res.data.data)
        if (res.data.code == 0) {


          that.setData({
            ArrayData: res.data.data
          })


          
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }


      }

    })
  }
})