Page({
  data: {

    currentTab: '',

  },
  /*** 滑动切换tab***/
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  /*** 点击tab切换***/
  swichTap: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
    console.log(e.target.dataset.current)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 钱包明细
  GoToPurseDetail: function () {
    wx.navigateTo({
      url: '../PurseDetail/PurseDetail',
    })
  },
  // 押金明细
  GoToDepositDetails: function () {
    wx.navigateTo({
      url: '../DepositDetails/DepositDetails',
    })
  },
  // 提现明细
  GoToTixianDetails: function () {
    wx.navigateTo({
      url: '../TiXianDetails/TiXianDetails',
    })
  }


})