var interval = null //倒计时函数
var md5 = require('../../utils/md5.min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CheckboxChecked: '',
    LoginPhone: '', //手机号
    LoginCode: '', //验证码
    disabled: false,
    CodeButtonString: '获取验证码',
    currentTime: 61,
    XueYiContent: '',
    DisplayTrueFlase: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("key--------" + getApp().globalData.HomePageData)
    console.log("----------User_Above_ID--------" + getApp().globalData.User_Above_ID)
    if (getApp().globalData.User_Above_ID == -1) {
      // this.setData({
      //   DisplayTrueFlase: true,
      //   CheckboxChecked: true
      // })
      this.setData({
        XueYiContent: '《亚鼎代理协议》',

      })
    } else {
      this.setData({
        XueYiContent: '《亚鼎用户协议》',

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


  /***************输入框内容***************** */
  LoginPhoneInput: function(e) {
    this.setData({
      LoginPhone: e.detail.value
    })
  },

  LoginCodeInput: function(e) {
    this.setData({
      LoginCode: e.detail.value
    })
  },

  // 获取验证码
  GetCodeData: function() {
    var that = this;

    if (that.data.LoginPhone.length < 11) {
      wx.showToast({
        title: '手机号输入有误',
        icon: 'none',
      })

    } else {
      wx.request({
        url: 'https://japi.waterever.cn/tools/get_code', //发短信版
        // url: 'https://japi.waterever.cn/tools/get_code_not_send',
        header: {
          // 'content-type': 'application/json' // Get默认值
          "Content-Type": "application/x-www-form-urlencoded" //POST默认值
        },
        method: "POST",
        data: {
          key: getApp().globalData.HomePageData,
          phone: that.data.LoginPhone,

        },
        success: function(res) {
          console.log(res)
          console.log(res.data)

          if (res.data.code == 0) {
            that.getCode(); //调用倒计时函数方法
            that.setData({
              disabled: true
            })
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
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
  },


  //  发送验证码的倒计时函数方法
  getCode: function(options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function() {
      currentTime--;
      that.setData({
        CodeButtonString: currentTime + '秒后获取'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          CodeButtonString: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },

  // 登录
  GoToAuthenticationNext: function() {
    var that = this;

    let messageCode_MD5_up = md5(that.data.LoginCode)
    console.log(that.data.LoginPhone)
    console.log(messageCode_MD5_up)



    if (that.data.LoginPhone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
      })
    } else if (that.data.LoginPhone.length < 11) {
      wx.showToast({
        title: '手机号输入有误',
        icon: 'none',
      })
    } else if (that.data.LoginCode == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
      })
    } else if (that.data.LoginCode.length < 6) {
      wx.showToast({
        title: '验证码有误',
        icon: 'none',
      })
    } else {


      if (getApp().globalData.User_Above_ID == -1) {

        wx.request({
          url: 'https://japi.waterever.cn/user/login',
          header: {
            // 'content-type': 'application/json' // Get默认值
            "Content-Type": "application/x-www-form-urlencoded" //POST默认值
          },
          method: "POST",
          data: {
            phone: that.data.LoginPhone,
            code: messageCode_MD5_up,

          },
          success: function(res) {
            console.log(res)
            console.log(res.data)
            console.log(res.data.data)
            // console.log(res.data.data.id)
            // console.log(res.data.data.token)
            if (res.data.code == 0) {
              getApp().globalData.token = res.data.data.token
              getApp().globalData.UserId = res.data.data.id
              getApp().globalData.HomeTokenHttpStatus = 1 //主页刷新
              getApp().globalData.UserStatus = 3102 //用户状态码
              wx.showToast({
                title: '注册成功',
                icon: 'none'
              })
              // wx.redirectTo({
              //   url: '../UserAfterSaleService/UserAfterSaleService',
              // })
              // 页面跳转至tab页
              wx.switchTab({
                url: '../HomePage/HomePage'
              });
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }




          }

        })
      } else {

        // 用户注册成功
        wx.request({
          url: 'https://japi.waterever.cn/user/login',
          header: {
            // 'content-type': 'application/json' // Get默认值
            "Content-Type": "application/x-www-form-urlencoded" //POST默认值
          },
          method: "POST",
          data: {
            phone: that.data.LoginPhone,
            code: messageCode_MD5_up,

          },
          success: function(res) {
            getApp().globalData.UserStatus = 3104
            console.log(res)
            console.log(res.data)
            // console.log(res.data.data)
            // console.log(res.data.data.id)
            // console.log(res.data.data.token)
            if (res.data.code == 0) {
              getApp().globalData.token = res.data.data.token
              getApp().globalData.UserId = res.data.data.id
              getApp().globalData.HomeTokenHttpStatus = 1
              getApp().globalData.UserStatus = 3104
              wx.showToast({
                title: '注册成功',
                icon: 'none'
              })
              wx.switchTab({
                url: '../AfterSaleService/AfterSaleService'
              })


              // 页面跳转至tab页
              // wx.switchTab({
              //   url: '../MyPage/MyPage'
              // });
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }




          }

        })



      }









    }



  },
  xieyi: function() {
    console.log("==========" + this.data.CheckboxChecked)

    if (getApp().globalData.User_Above_ID == -1) { //代理商协议
      wx.navigateTo({
        url: '../XieYiDaliTwo/XieYiDaliTwo',
      })
    } else { //用户协议
      wx.navigateTo({
        url: '../XieYiYongHu/XieYiYongHu',
      })
    }


  },

  checkboxChange: function(e) {

    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    console.log('checkbox发生change事件，携带value值为：', e.detail.value.length)


    if (e.detail.value.length == 1) {
      this.setData({
        CheckboxChecked: true
      })
    } else {
      this.setData({
        CheckboxChecked: false
      })
    }



  },
})