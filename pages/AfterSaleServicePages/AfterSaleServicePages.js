Page({

  /**
   * 页面的初始数据
   */
  data: {
    User_deviceId: '',
    Daydata: '',
    DeviceIDdata: '',
    CreateDatedata: '',
    Batterydata: '',
    NextType:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("============设备ID=================" + options.User_deviceId)
    this.setData({
      User_deviceId: options.User_deviceId
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
    this.GetHttpData();
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
  
  // 设备报修
  GoToEquipmentRepair: function() {
    this.setData({
      NextType:1
    })
    wx.navigateTo({
      url: '../EquipmentRepair/EquipmentRepair?Type=' + this.data.NextType,
    })
  },
  // 设备拆机
  GoToDepositDetailss: function() {
    this.setData({
      NextType: 2
    })
    wx.navigateTo({
      url: '../EquipmentRepair/EquipmentRepair?Type=' + this.data.NextType,
    })
  },

  // 设备移机
  GoToDepositDetailsss: function () {
    this.setData({
      NextType: 3
    })
    wx.navigateTo({
      url: '../EquipmentRepair/EquipmentRepair?Type=' + this.data.NextType,
    })
  },



  GetHttpData: function() {
    var that = this;
    console.log("-------that.data.User_deviceId-------" + that.data.User_deviceId)

    wx.request({
      url: 'https://japi.waterever.cn/device/after_sales_data',
      header: {
        Authorization: getApp().globalData.token,
        'content-type': 'application/json' // Get默认值
        // "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      // method: "POST",
      data: {
        device_id: that.data.User_deviceId,
      },
      success: function(res) {
        console.log(res)
        // console.log(res.data.data.DeviceId)
        if (res.data.code == 0) {

          that.setData({
            Daydata: res.data.data.Day,
            DeviceIDdata: res.data.data.DeviceId,
            CreateDatedata: res.data.data.CreateDate,
            Batterydata: res.data.data.Battery
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