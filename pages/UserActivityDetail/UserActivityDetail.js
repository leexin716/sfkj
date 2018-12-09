// pages/UserActivityDetail/UserActivityDetail.js
Page({
  data: {
    apply:false
  },
  onLoad: function (options) {
    console.log(options.apply)
    if (options.apply){
      this.setData({
        apply:true
      })
    }
  },
  applyFn(){
    wx.switchTab({
      url: '../AfterSaleService/AfterSaleService',
    })
  }
})