Page({

  /**
   * 页面的初始数据
   */
  data: {
    Phone: '',
    Code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      Phone: options.Phone,
      Code: options.Code,
    })
  },
  GoToNext: function() {
    var that = this;
    wx.request({
      url: 'https://japi.waterever.cn/user/login',
      header: {
        // 'content-type': 'application/json' // Get默认值
        "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      method: "POST",
      data: {
        phone: that.data.Phone,
        code: that.data.Code,

      },
      success: function(res) {
        console.log(res)
        console.log(res.data)
        // console.log(res.data.data)
        // console.log(res.data.data.id)
        // console.log(res.data.data.token)
        if (res.data.code == 0) {
          getApp().globalData.token = res.data.data.token
          getApp().globalData.UserId = res.data.data.id
          getApp().globalData.UserStatus = 3102
          if (getApp().globalData.User_Above_ID == -1) {
            wx.redirectTo({
              url: '../AuthenticationNext/AuthenticationNext',
            })
          } else {
            wx.redirectTo({
              url: '../UserAfterSaleService/UserAfterSaleService',
            })
          }

        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            success: function(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../Authentication/Authentication',
                })
              } else if (res.cancel) {
                wx.redirectTo({
                  url: '../Authentication/Authentication',
                })

              }
            }
          })
        }




      }

    })
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