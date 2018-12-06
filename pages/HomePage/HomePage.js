Page({

  /**
   * 页面的初始数据
   */
  data: {
    Notice: '', //公告
    FirsttenData: [], //排行
    Soldout: ''
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    wx.getStorage({
      key: 'UserCode',
      success: function (res) {
        console.log("=====UserCode=======" + res.data);
      },
    })

    
    wx.showLoading({
      title: '加载中',
    })

    console.log("getApp().globalData.HomeTokenHttpStatus=======" + getApp().globalData.HomeTokenHttpStatus)
    console.log(" getApp().globalData.token====" + getApp().globalData.token)
    if (getApp().globalData.HomeTokenHttpStatus == 1) { //刷新首页
      this.GetHomePageData();
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    var that = this;

    // 二维码进入的用户
    if (options.q !== undefined) {
      var scan_url = decodeURIComponent(options.q);
      // http://qrcode.waterever.cn/wxqrcode?id=1144&aid=1   //助理
      console.log("============" + scan_url);
      var Above_ID = scan_url.replace('http://qrcode.waterever.cn/wxqrcode?id=', '')
      // console.log("=======扫码截取结果======" + Above_ID);
      var a = Above_ID.split("&aid=");
      console.log("=======扫码截取结果长度======" + a.length);
      console.log("=======扫码截取结果======" + a[0]);
      console.log("=======扫码截取结果======" + a[1]);
      //  var  TestID=
      if (a.length == 1) {
        getApp().globalData.User_Above_ID = a[0]
        getApp().globalData.User_Aid_ID = -1
      } else if (a.length == 2) {
        getApp().globalData.User_Above_ID = a[0]
        getApp().globalData.User_Aid_ID = a[1]
      } else { }
      console.log("=======getApp().globalData.User_Above_ID======" + getApp().globalData.User_Above_ID)
      console.log("=======getApp().globalData.User_Aid_ID======" + getApp().globalData.User_Aid_ID)


      // getApp().globalData.User_Above_ID = a[0]
      // getApp().globalData.User_Aid_ID = a[1]
    } else {
      console.log(123);
    }






    if (getApp().globalData.HomeTokenHttpStatus == 1) {
      that.GetHomePageData();
    } else {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            console.log("已经授权，直接调用 GetUserInfo()函数 获取头像信息")


            that.GetUserInfo();
          } else {
            wx.hideLoading();
            wx.hideNavigationBarLoading()
            console.log('调起授权弹框')
            wx.authorize({
              scope: 'scope.userInfo',
              success() {
                // 授权成功
                console.log("授权成功,调用 GetUserInfo()函数 获取头像信息")
                that.GetUserInfo();
              },
              // 授权失败
              fail: function () {
                //获取用户信息失败后。请跳转授权页面
                wx.showModal({
                  title: '提示',
                  content: '尚未进行授权，无法正常使用小程序，请进行授权。',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      wx.redirectTo({
                        url: '../Welcome/Welcome',
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                      wx.redirectTo({
                        url: '../Welcome/Welcome',
                      })
                    }
                  }
                })
              }
            })
          }
        }
      })
    }
  },



  GetUserInfo: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        console.log("-------code---------" + getApp().globalData.logincode)
        console.log("------ encryptedData --------" + res.encryptedData)
        console.log("------ iv ------" + res.iv)
        console.log("------ Above_ID ------" + getApp().globalData.User_Above_ID)
        console.log("------ Aid_ID ------" + getApp().globalData.User_Aid_ID)
        console.log("登录是获取的" + getApp().globalData.logincode)
        wx.request({
          url: 'https://japi.waterever.cn/user/get_union_id',
          header: {
            // 'content-type': 'application/json' // Get默认值
            "Content-Type": "application/x-www-form-urlencoded" //POST默认值
          },
          method: "POST",
          data: {
            code: getApp().globalData.logincode,
            iv: res.iv,
            encryptedData: res.encryptedData,
            super_id: getApp().globalData.User_Above_ID,
            assistant_id: getApp().globalData.User_Aid_ID
          },
          success: function (res) {
            wx.hideLoading();
            console.log(res)
            // 存储注册需要使用的key
            getApp().globalData.HomePageData = res.data.data
            getApp().globalData.UserStatus = res.data.status
            if (res.data.status == 3100) { //新代理商
              // getApp().globalData.token = res.data.data.token
              // getApp().globalData.UserId = res.data.data.user.id
              // getApp().globalData.HomeTokenHttpStatus = 1
              if (getApp().globalData.User_Above_ID == -1) {
                wx.redirectTo({
                  url: '../Authentication/Authentication',
                })
                console.log("------ ssssssssssssssssss_ID ------" + getApp().globalData.User_Above_ID)
              } else {
                console.log("------ aaaaaaaaaaaaaaaa_ID ------" + getApp().globalData.User_Above_ID)
                wx.redirectTo({
                  url: '../Authentication/Authentication',
                })
              }
            } else if (res.data.status == 3101) { //老代理商

              getApp().globalData.token = res.data.data.token
              getApp().globalData.UserId = res.data.data.user.id

              // console.log("=============" + res.data.data.type)
              if (res.data.data.type == 3) {

                getApp().globalData.UserPageType = res.data.data.type

                wx.switchTab({
                  url: '../AfterSaleService/AfterSaleService'
                })
              } else {
                that.GetHomePageData();
              }
            } else if (res.data.status == 3102) { //已注册，未认证

              getApp().globalData.token = res.data.data.token
              getApp().globalData.UserId = res.data.data.user.id
              // wx.redirectTo({
              //   url: '../AuthenticationNext/AuthenticationNext',
              // })
              that.GetHomePageData();
            } else if (res.data.status == 3103) {

              getApp().globalData.token = res.data.data.token
              getApp().globalData.UserId = res.data.data.user.id
              // wx.redirectTo({
              //   url: '../UserAfterSaleService/UserAfterSaleService',
              // })
              that.GetHomePageData();
            } else if (res.data.status == 3104) { //用户
              getApp().globalData.token = res.data.data.token
              getApp().globalData.UserId = res.data.data.user.id
              // wx.redirectTo({
              //   url: '../UserAfterSaleService/UserAfterSaleService',
              // })
              wx.switchTab({
                url: '../MyPage/MyPage'
              })
            }
          }

        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    getApp().globalData.HomeTokenHttpStatus = 1
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },




  // 请求首页网络数据
  GetHomePageData: function () {
    var that = this;

    // wx.checkSession({
    //   success() {
    //     console.log("============成功=================" + getApp().globalData.UserStatus)
    //   },
    //   fail() {
    //     console.log("============失败=================" + getApp().globalData.UserStatus)
    //   }
    // })



    // console.log("老用户时的Token" + getApp().globalData.token)
    wx.request({
      url: 'https://japi.waterever.cn/user/home_data',
      header: {
        Authorization: getApp().globalData.token,
        'content-type': 'application/json' // Get默认值
        // "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      method: "GET",
      data: {
        test: 0
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res)
        console.log("4564545454544556")
        console.log(res.data.data.message)

        that.setData({
          FirsttenData: res.data.data.firstten,
          Notice: res.data.data.message,
          Soldout: res.data.data.soldout
        })

      }

    })

  },
  // 活动规则
  GoToRulesOfActivity: function () {
    wx.navigateTo({
      url: '../RulesOfActivit/RulesOfActivit',
    })
  }




})