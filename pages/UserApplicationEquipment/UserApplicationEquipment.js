Page({

  /**
   * 页面的初始数据
   */
  data: {
    CityAddress: ['浙江省', '宁波市', '鄞州区'], //省市区
    UserName: '',
    MyID: '',
    UserAddress: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /***************输入框内容***************** */
  UserNameInput: function(e) {
    this.setData({
      UserName: e.detail.value
    })
  },

  /***************输入框内容***************** */
  MyIDInput: function(e) {
    this.setData({
      MyID: e.detail.value
    })
  },

  /***************输入框内容***************** */
  UserAddressInput: function(e) {
    this.setData({
      UserAddress: e.detail.value
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

  },
  // 城市选择器
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      CityAddress: e.detail.value,
    })
  },


  GoToUserApplicationEquipmentNext: function() {
    this.GetHttp();

  },



  GetHttp: function() {

    var that = this;
    var Address = this.data.CityAddress[0] + " " + this.data.CityAddress[1] + " " + this.data.CityAddress[2]

    // console.log("===========" + that.data.UserName + "===========" + that.data.MyID + "===========" + Address + "===========" + that.data.UserAddress)
    if (that.data.UserName.length < 1) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
      })
    } else if (that.data.MyID.length !== 11) {
      wx.showToast({
        title: '手机号输入错误',
        icon: 'none',
      })
    } else if (that.data.UserAddress.length < 3) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
      })
    } else {

      wx.request({
        url: 'https://japi.waterever.cn/device/apply',
        header: {
          Authorization: getApp().globalData.token,
          // 'content-type': 'application/json' // Get默认值
          "Content-Type": "application/x-www-form-urlencoded" //POST默认值
        },
        method: "POST",
        data: {
          phone: that.data.MyID,
          area: Address,
          address: that.data.UserAddress,
          name: that.data.UserName,
          id: getApp().globalData.UserId,
          type: 0,
          super_id: getApp().globalData.User_Above_ID,
          assistant_id: getApp().globalData.User_Aid_ID
        },
        success: function(res) {
          console.log(res)
          console.log(res.data)
          console.log(res.data.data)
          if (res.data.code == 0) {

            wx.redirectTo({
              url: '../UserApplicationEquipmentNext/UserApplicationEquipmentNext?Name=' + that.data.UserName + '&Phone=' + that.data.MyID + "&Ares=" + Address + "&UserAddress=" + that.data.UserAddress + "&OrderId=" + res.data.data
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            })
          }

        }

      })
    }








  }
})