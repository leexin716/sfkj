Page({

  /**
   * 页面的初始数据
   */
  data: {
    GetHttpDatas: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    wx.request({
      url: 'https://japi.waterever.cn/tools/count_down',
      header: {
        'content-type': 'application/json' // 默认值
      },
      // method: POST,
      data: {

      },
      success: function(res) {
        console.log(res)
        console.log(res.data.data)
        that.setData({
          GetHttpDatas: res.data.data
        })
      }

    })


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
  // 页面跳转，进入主页
  GoToHomePage: function(e) {
    console.log(e.detail.errMsg)
    // console.log(e)
    if (e.detail.errMsg === "getUserInfo:fail auth deny") {
      // console.log("111111111111")
      wx.showModal({
        title: '提示',
        content: '为保证你的正常使用，请授权！',
        success: function(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    } else {
      // 页面跳转至tab页
      wx.switchTab({
        url: '../HomePage/HomePage'
      });
     
    }

  },


  // () {
  //   // 页面跳转，进入主页

  //   // 保持当前页跳转
  //   // wx.navigateTo({
  //   //   url: '../HomePage/HomePage',
  //   // })

  //   // 不保持当前页跳转
  //   // wx.redirectTo({
  //   //   url: '../HomePage/HomePage',
  //   // })

  //   // 页面跳转至tab页
  //   wx.switchTab({
  //     url: '../HomePage/HomePage'
  //   });
  // }


})