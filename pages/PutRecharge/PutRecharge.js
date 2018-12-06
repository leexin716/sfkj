Page({

  /**
   * 页面的初始数据
   */
  data: {
    PutManye: '',
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
  onShareAppMessage: function() {},
  PutManyeInput: function(e) {
    this.setData({
      PutManye: e.detail.value
    })
  },

  Over: function() {
    var that = this;
    console.log(that.data.PutManye)


    if (that.data.PutManye < 1) {
      wx.showToast({
        title: '充值金额不能小于1元',
        icon: 'none',
      })
    } else {
      wx.request({
        url: 'https://japi.waterever.cn/finance/pay_to_recharge',
        header: {
          Authorization: getApp().globalData.token,
          // 'content-type': 'application/json' // Get默认值
          "Content-Type": "application/x-www-form-urlencoded" //POST默认值
        },
        method: "POST",
        data: {
          pay_type: 2,
          id: getApp().globalData.UserId,
          money: that.data.PutManye

        },
        success: function(res) {
          console.log(res)
          console.log(res.data.code)

          wx.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': 'MD5',
            'paySign': res.data.data.paySign,
            'success': function(res) {
              console.log(res)
              if (res.errMsg == 'requestPayment:ok') {
                wx.showToast({
                  title: '充值成功',
                  icon: 'none',
                  duration: 2000
                })
                wx.navigateBack({

                })

              } else {

              }

            },
            'fail': function(res) {

              wx.showToast({
                title: '取消支付',
                icon: 'none',
                duration: 2000
              })
            }
          })


        }

      })
    }




  }
})