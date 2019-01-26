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
      console.log(getApp().globalData.UserStatus)
      if (getApp().globalData.UserStatus == 3100) {
        wx.redirectTo({
          url: '../Authentication/Authentication',
        })
      } else if (getApp().globalData.UserStatus == 3102) {
        wx.navigateTo({
          url: '../AuthenticationNext/AuthenticationNext',
        })
      } else if (getApp().globalData.UserStatus == 3103) {
        wx.navigateTo({
          url: '../ApplicationEquipment/ApplicationEquipment?PutHuo=' + this.data.PutHuo,
        })
      } else if (getApp().globalData.UserStatus == 3104) {
        wx.navigateTo({
          url: '../AuthenticationNext/AuthenticationNext',
        })
      }
  }
})