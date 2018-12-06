Page({

  /**
   * 页面的初始数据
   */
  data: {
    CheckboxChecked: '',
    DefaultNumBerInputs: 10, //默认购买数量
    NumBerInputs: 1, //购买数量

    AllMoney: 0, //购买总金额
    Balance: '', //钱包余额
    KuCun: '',

    cartArr: [{
      itmes: 2
    }, {
      itmes: 3
    }]
    
    
    
    
    
    
    ,








    
    status: 2 //用于判断是微信支付 还是钱包支付 2：微信支付 3：钱包支付

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("我的页面传递来的库存=========" + options.PutHuo)
    this.setData({
      KuCun: options.PutHuo
    })
    this.GetHttpApplicationEquipment();
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

  },
  /************************页面点击事件处理*******************************/
  // 设备数量----
  NumrDelete: function() {
    // console.log(PustInputNumBe)
    if (this.data.NumBerInputs > 1) {
      this.setData({
        NumBerInputs: this.data.NumBerInputs - 1,
        DefaultNumBerInputs: this.data.DefaultNumBerInputs - 10,
        AllMoney: this.data.AllMoney - 9980
      })
    }
  },
  // 设备数量+++++
  NumrAdd: function() {
    var a = this.data.NumBerInputs;
    var b = this.data.DefaultNumBerInputs;
    var c = this.data.AllMoney;
    // console.log(constructor(a));
    // console.log(this.data.NumBerInputs)
    this.setData({
      NumBerInputs: parseInt(a) + 1,
      DefaultNumBerInputs: parseInt(b) + 10,
      AllMoney: parseInt(c) + 9980
    })
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      status: e.detail.value
    })
  },


  GetHttpApplicationEquipment: function() {

    var that = this;

    console.log("getApp().globalData.UserId=========" + getApp().globalData.UserId +
      "-------getApp().globalData.token=============" + getApp().globalData.token)

    var id = getApp().globalData.UserId
    wx.request({
      url: 'https://japi.waterever.cn/finance/pay_stock_data/' + id,
      header: {
        Authorization: getApp().globalData.token,
        'content-type': 'application/json' // Get默认值
        // "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      // method: "POST",
      data: {

      },
      success: function(res) {
        console.log(res)
        console.log(res.data.data.deposit)

        that.setData({
          Balance: res.data.data.balance,
          AllMoney: res.data.data.deposit * 10
        })


      }

    })

  },
  // 立即支付
  GoToPayment: function() {
    var that = this;
    console.log("支付金额=========" + that.data.AllMoney + "=======支付方式======" + that.data.status + "=======数量======" + that.data.DefaultNumBerInputs)



    wx.request({
      url: 'https://japi.waterever.cn/finance/pay_to_stock',
      header: {
        Authorization: getApp().globalData.token,
        // 'content-type': 'application/json' // Get默认值
        "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      method: "POST",
      data: {
        pay_type: that.data.status,
        // pay_type: 2,
        id: getApp().globalData.UserId,
        count: that.data.DefaultNumBerInputs
      },
      success: function(res) {
        console.log(res)
        console.log(res.data.code)
        console.log(res.data.data)
        // console.log(res.data.data.nonceStr)
        if (res.data.code == 0) {

          var AllMoney = that.data.AllMoney
          if (that.data.status == 3) {
            var TransactionId = res.data.data
            wx.redirectTo({
              url: '../ApplicationEquipmentSuccess/ApplicationEquipmentSuccess?TransactionId=' + TransactionId + '&AllMoney=' + AllMoney
            })
          } else {

            var TransactionId = res.data.data.transactionId

            wx.requestPayment({

              'timeStamp': res.data.data.timeStamp,
              'nonceStr': res.data.data.nonceStr,
              'package': res.data.data.package,
              'signType': 'MD5',
              'paySign': res.data.data.paySign,
              'success': function(res) {
                console.log(res)
                if (res.errMsg == 'requestPayment:ok') {
                  // getApp().globalData.UserStatus = 3301
                  wx.redirectTo({
                    url: '../ApplicationEquipmentSuccess/ApplicationEquipmentSuccess?TransactionId=' + TransactionId + '&AllMoney=' + AllMoney
                  })
                } else {}
              },
              'fail': function(res) {
                console.log("=============" + TransactionId + "============" + AllMoney)
                wx.showToast({
                  title: '取消支付',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }

      }

    })





  },
  // 协议
  xieyi: function() {
    wx.navigateTo({
      url: '../XieYiDaliTwo/XieYiDaliTwo',
    })
  },
  GoToPayments:function(){
wx.showToast({
  title: '请先仔细阅读并同意《WATEREVER代理协议》',
  icon:'none'
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