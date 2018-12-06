// pages/UserWallet/UserWallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AgentDeposit: '', //代理押金
    Balance: '', //可用余额
    CashApply: '', //提现申请金额
    CashOut: '', //提现金额
    Commission: '', //佣金
    DeviceDeposit: '', //设备押金
    Recharge: '' //充值金额








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
    this.GetHttpUserWallet();
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
  // 钱包明细
  GoToPurseDetail: function() {
    wx.navigateTo({
      url: '../PurseDetail/PurseDetail?type=0',
    })
  },
  // 设备押金
  // GpToEquipmentDeposit: function() {
  //   wx.navigateTo({
  //     url: '../EquipmentDeposit/EquipmentDeposit',
  //   })
  // },
  GpToEquipmentDeposit: function () {
    wx.navigateTo({
      url: '../PurseDetail/PurseDetail?type=1',
    })
  },
  //充值明细
  // GoToRecharge: function () {
  //   wx.navigateTo({
  //     url: '../Recharge/Recharge',
  //   })
  // },

  GoToRecharge: function () {
    wx.navigateTo({
      url: '../PurseDetail/PurseDetail?type=2',
    })
  },


  // 提现明细
  // GoToTiXianDetails: function() {
  //   wx.navigateTo({
  //     url: '../TiXianDetails/TiXianDetails',
  //   })
  // },
  GoToTiXianDetails: function () {
    wx.navigateTo({
      url: '../PurseDetail/PurseDetail?type=3',
    })
  },
  // 佣金收入
  // GoToCommissionIncome: function() {
  //   wx.navigateTo({
  //     url: '../CommissionIncome/CommissionIncome',
  //   })
  // },
  
  GoToCommissionIncome: function () {
    wx.navigateTo({
      url: '../PurseDetail/PurseDetail?type=4',
    })
  },








  // 充值
  GoToPutRecharge: function() {
    wx.navigateTo({
      url: '../PutRecharge/PutRecharge',
    })
  },
  // 提现
  GoToTiXian: function() {
    wx.navigateTo({
      url: '../TiXian/TiXian',
    })
  },



  // 页面数据请求
  GetHttpUserWallet: function() {
    var that = this;
    wx.request({
      url: 'https://japi.waterever.cn/user/agent_wallet',
      header: {
        Authorization: getApp().globalData.token,
        // 'content-type': 'application/json' // Get默认值
        "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      method: "POST",
      data: {
        id: getApp().globalData.UserId
      },
      success: function(res) {
        console.log(res)
        console.log(res.data.data.Balance)

        that.setData({

          AgentDeposit: res.data.data.AgentDeposit,
          Balance: res.data.data.Balance,
          CashApply: res.data.data.CashApply,
          CashOut: res.data.data.CashOut,
          Commission: res.data.data.Commission,
          DeviceDeposit: res.data.data.DeviceDeposit,
          Recharge: res.data.data.Recharge
        })

      }

    })

  }

})