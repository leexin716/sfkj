//app.js
const updateManager = wx.getUpdateManager();
App({
  onLaunch: function(options) {



    // if (!wx.cloud) {
    //   console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    // } else {
    //   wx.cloud.init({
    //     traceUser: true,
    //   })
    // }

    wx.login({
      success: function(res) {
        // console.log(res)
        if (res.code) {
          // console.log('登录成功！' + res.code)
          getApp().globalData.logincode = res.code;
        } else {
          // console.log('登录失败！' + res.errMsg)
        }
      }
    });






    // 主动检测版本更新
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      // console.log("是否有新版本====" + res.hasUpdate)
    })
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })

    updateManager.onUpdateFailed(function() {
      // 新的版本下载失败
    })

    this.globalData = {
      HomeTokenHttpStatus: 0,
      logincode: '',
      HomePageData: '',
      token: '',
      UserId: '',
      HomeHttpDatas: 0,
      UserErWeiMaId: '',
      User_Above_ID: -1,
      User_Aid_ID: -1,
      SuperiorQrCode: '', //代理全局二维码
      DeviceOrderId: '', //购买设备时需要的ID
      UserStatus: '',
      UserPageType: 0,
      XqOrderId: -1,
      oldAgent:false
    }
  }

})