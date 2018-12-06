Page({

  /**
   * 页面的初始数据
   */
  data: {
    CityAddress: ['    浙江省', '宁波市', '鄞州区'], //个人认证默认省市区
    addre: '',
    Phone: '',
    Name: '',
    date: '2018-09-01',
    details: '',
    TypeStatus: 0,
    ContentOne: '',
    ContentTwo: '',
  },

  /***************输入框内容***************** */
  addreInput: function(e) {
    this.setData({
      addre: e.detail.value
    })
  },
  PhoneInput: function(e) {
    this.setData({
      Phone: e.detail.value
    })
  },

  NameInput: function(e) {
    this.setData({
      Name: e.detail.value
    })
  },

  detailsInput: function(e) {
    this.setData({
      details: e.detail.value
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("---------options.Type----------" + options.Type)
    this.setData({
      TypeStatus: options.Type
    })

    if (options.Type == 1) {
      wx.setNavigationBarTitle({
        title: '设备报修'
      })
      this.setData({
        ContentOne: '',
        ContentTwo: '维修地址'
      })

    } else if (options.Type == 2) {

      wx.setNavigationBarTitle({
        title: '申请拆机'
      })
      this.setData({
        ContentOne: '',
        ContentTwo: '拆机地址'
      })
    } else if (options.Type == 3) {

      wx.setNavigationBarTitle({
        title: '申请移机'
      })
      this.setData({
        ContentOne: '',
        ContentTwo: '更换地址'
      })
    }
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
  // 城市选择器
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      CityAddress: e.detail.value,
    })
  },
  // 时间选择器
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 提交申请按钮
  SubmissionBtn: function() {
    var that = this;
    console.log("-----地区------" + that.data.CityAddress +
      "-----详细地址------" + that.data.addre +
      "-----联系电话------" + that.data.Phone +
      "-----联系人------" + that.data.Name +
      "-----预约时间------" + that.data.date +
      "-----故障原因------" + that.data.details +
      "-----OrderId------" + getApp().globalData.XqOrderId +
      "-----Type------" + that.data.TypeStatus
    )


    if (that.data.addre.length < 0) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
    } else if (that.data.Phone.length < 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
    } else if (that.data.Name.length < 0) {
      wx.showToast({
        title: '请输入联系人',
        icon: 'none'
      })
    } else if (that.data.details.length < 0) {
      wx.showToast({
        title: '请输入故障原因',
        icon: 'none'
      })
    }
    wx.request({
      url: 'https://japi.waterever.cn/device/after_sales_apply',

      header: {
        Authorization: getApp().globalData.token,
        // 'content-type': 'application/json' // Get默认值
        "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      method: "POST",
      data: {
        area: that.data.CityAddress,
        order_id: getApp().globalData.XqOrderId,
        name: that.data.Name,
        phone: that.data.Phone,
        address: that.data.addre,
        appointment_date: that.data.date,
        remark: that.data.details,
        type: that.data.TypeStatus
      },
      success: function(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: res.data.data,
            icon: 'none'
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