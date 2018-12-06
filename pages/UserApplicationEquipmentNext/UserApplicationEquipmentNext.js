Page({

  /**
   * 页面的初始数据
   */
  data: {
    CheckboxChecked: '',
    // DefaultNumBerInputs: 1, //默认购买数量
    NumBerInputs: 1, //购买数量
    AllMoney: 0, //购买总金额
    Deposit: 0,
    YearFee: 0,
    cartArr: [{
      itmes: 1
    }, {
      itmes: 0
    }],
    Name: '',
    Phone: '',
    Ares: '',
    UserAddress: '',
    OrderId: '',
    AnInstall: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      // Name: options.Name,
      // Phone: options.Phone,
      // Ares: options.Ares,
      // UserAddress: options.UserAddress,
      OrderId: options.OrderId
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
    this.GetHttp();
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

  /************************页面点击事件*********************** */
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      AnInstall: e.detail.value
    })
  },



  OverButtpn: function() {
    var that = this;
    console.log(that.data.AnInstall + "===============" + that.data.OrderId)
    wx.request({
      url: 'https://japi.waterever.cn/finance/pay_apply',
      header: {
        Authorization: getApp().globalData.token,
        // 'content-type': 'application/json' // Get默认值
        "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      method: "POST",
      data: {
        order_id: that.data.OrderId,
        pay_type: 2,
        install: that.data.AnInstall
      },
      success: function(res) {
        console.log(res)
        console.log(res.data.code)
        if (res.data.code == 0) {
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
                  title: '支付成功',
                  icon: 'none',
                  duration: 2000
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
        } else {
          wx.showToast({
            title: red.data.msg,
            icon: 'none',
            duration: 2000
          })
        }



      }

    })
  },



  GetHttp: function() {
    var that = this;
    wx.request({
      url: 'https://japi.waterever.cn/device/pay_data',
      header: {
        Authorization: getApp().globalData.token,
        'content-type': 'application/json' // Get默认值
        // "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      // method: "POST",
      data: {
        // id: getApp().globalData.UserId,
        order_id: that.data.OrderId
      },
      success: function(res) {
        console.log(res)
        console.log(res.data)

        if (res.data.code == 0) {
          that.setData({
            Deposit: res.data.data.deposit,
            YearFee: res.data.data.year_fee,
            AllMoney: res.data.data.deposit + res.data.data.year_fee + res.data.data.member_fee,
            Name: res.data.data.name,
            Ares: res.data.data.address,
            Phone: res.data.data.phone,
            UserAddress: res.data.data.area
          })
        } else {
          wx.showToast({
            title: red.data.msg,
            icon: 'none',
            duration: 2000
          })
        }



      }

    })
  },
  xieyi: function() {
    wx.navigateTo({
      url: '../XieYiYongHu/XieYiYongHu',
    })
  },
  OverButtpns: function() {
    wx.showToast({
      title: '请先仔细阅读并同意《WATEREVER用户协议》',
      icon: 'none'
    })
  },

  checkboxChange: function(e) {

    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    console.log('checkbox发生change事件，携带value值为：', e.detail.value.length)


    if (e.detail.value.length == 1) {
      this.setData({
        CheckboxChecked: true
      })
    } else {
      this.setData({
        CheckboxChecked: false
      })
    }

  }
})