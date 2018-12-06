// pages/WuLiu/WuLiu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    GetHttpData: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // WuLiuexpressCode: '',
    // WuLiuexpressCompanyCode: ''
    console.log(options.WuLiuexpressCode + "--------------" + options.WuLiuexpressCompanyCode)
    this.setData({
      WuLiuexpressCode: options.WuLiuexpressCode,
      WuLiuexpressCompanyCode: options.WuLiuexpressCompanyCode
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

  GetHttpData: function () {
    var that = this;
    wx.request({

      url: 'https://japi.waterever.cn/express/search',
      header: {
        Authorization: getApp().globalData.token,
        'content-type': 'application/json' // Get默认值
        // "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      // method: "POST",
      data: {
        express_company_code: that.data.WuLiuexpressCode,
        express_code: that.data.WuLiuexpressCompanyCode,

      },
      success: function (res) {
        console.log(res),
          console.log(res.data)

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


  
})