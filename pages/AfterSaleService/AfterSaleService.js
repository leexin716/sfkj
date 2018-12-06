Page({
  data: {
    // 定位城市
    currentCity: '---',
    text1: '剩余',
    text2: '',
    text3: '天',

    bottomData: '', //设备状态码
    WuLiuexpressCode: '', //物流页所需参数
    WuLiuexpressCompanyCode: '', //物流页所需参数
    orderId: '',
    User_deviceId: '', //设备ID

    /*****自定义弹框 */
    showModal: false,
    inputChangeData: ''

    /*****自定义弹框 */
  },

  /****************************按钮点击方法区************************** */

  onLoad: function(options) {
    console.log("============" + getApp().globalData.UserErWeiMaId)
    this.GetLoadCity();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log("onShareAppMessage")
  },
  /*****************下拉刷新******************* */

  onPullDownRefresh: function() {

  },

  // 页面展示时
  onShow: function() {
    wx.showLoading({
      title: '加载中',
    })
    console.log("onShow----------" + this.data.count + "============SW----" + this.data.AddswiperIndex)
    this.GetHttpAfterSaleService();

  },

  onHide: function() {

  },



  /********************按键点击事件************************* */
  GoToUserApplicationEquipment: function() {
    getApp().globalData.User_Above_ID
    console.log("==============getApp().globalData.UserStatus==========" + getApp().globalData.UserStatus)

    if (getApp().globalData.UserStatus == 3101) {
      wx.navigateTo({
        url: '../UserApplicationEquipment/UserApplicationEquipment',
      })
    } else if (getApp().globalData.User_Above_ID !== -1) {
      wx.navigateTo({
        url: '../UserApplicationEquipment/UserApplicationEquipment',
      })
    } else if (getApp().globalData.UserStatus == 3102) {

      if (getApp().globalData.User_Above_ID !== -1) {
        wx.navigateTo({
          url: '../UserApplicationEquipment/UserApplicationEquipment',
        })
      } else {
        this.setData({
          showModal: true
        })
      }
    } else if (getApp().globalData.UserStatus == 3103) {
      if (getApp().globalData.User_Above_ID !== -1) {
        wx.navigateTo({
          url: '../UserApplicationEquipment/UserApplicationEquipment',
        })
      } else {
        this.setData({
          showModal: true
        })
      }
    } else {
      this.setData({
        showModal: true
      })
    }

  },





  // 设备网络数据
  GetHttpAfterSaleService: function() {
    var that = this;
    var DerviceDay = 0;
    wx.request({
      url: 'https://japi.waterever.cn/device/device_home',
      header: {
        Authorization: getApp().globalData.token,
        // 'content-type': 'application/json' // Get默认值
        "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      method: "POST",
      data: {
        id: getApp().globalData.UserId,
      },
      success: function(res) {
        console.log(res)
        console.log(res.data.data)
        if (res.data.code == 0) {
          wx.hideLoading();
          if (res.data.data == null) {
            console.log("------------------" + '');
          } else {
            console.log("------------------" + res.data.data.status);

            if (res.data.data.time !== null) {
              DerviceDay = res.data.data.time
            }
            that.setData({
              bottomData: res.data.data.status,
              text2: DerviceDay,
              orderId: res.data.data.orderId,
              WuLiuexpressCode: res.data.data.expressCode,
              WuLiuexpressCompanyCode: res.data.data.expressCompanyCode,
              User_deviceId: res.data.data.deviceId
            })
            getApp().globalData.XqOrderId = res.data.data.orderId
          }
        } else {
          wx.hideLoading();
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
          })
        }


      }

    })
  },



  // 一键激活
  goToDevice: function() {
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log("=======扫码结果======" + res.result)
        var resultstr = res.result;
        var overnum = resultstr.replace('http://a.app.qq.com/o/simple.jsp?pkgname=com.nbappdev.water&deviceid=', '')

        wx.request({
          url: 'https://japi.waterever.cn/device/device_binding',
          header: {
            Authorization: getApp().globalData.token,
            // 'content-type': 'application/json' // Get默认值
            "Content-Type": "application/x-www-form-urlencoded" //POST默认值
          },
          method: "POST",
          data: {
            id: that.data.orderId,
            code: overnum
          },
          success: function(res) {
            console.log(res)
            console.log(res.data)
            if (res.data.code == 0) {
              console.log(res.data.msg)
              wx.showModal({
                title: '提示',
                content: '设备激活成功',
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')

                  } else if (res.cancel) {
                    console.log('用户点击取消')

                  }
                }
              })
            } else {

              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }

          }

        })


        //   // 向下一个页面传递扫码成功的参数
        // wx.redirectTo({
        //   url: '../device/device?qucodeData=' + overnum,
        // })
      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败',
          icon: 'none',
          duration: 2000
        })
      }
    })

  },


  // 继续申请
  GoToUserApplicationEquipmentNext: function() {
    wx.navigateTo({
      url: '../UserApplicationEquipmentNext/UserApplicationEquipmentNext?OrderId=' + this.data.orderId,
    })
  },
  // 物流
  GoToWuLiu: function() {
    wx.navigateTo({
      url: '../WuLiu/WuLiu?WuLiuexpressCode=' + this.data.WuLiuexpressCode + '&WuLiuexpressCompanyCode=' + this.data.WuLiuexpressCompanyCode,
    })
  },

  // 售后服务
  GoToAfterSaleServicePages: function() {
    wx.navigateTo({
      url: '../AfterSaleServicePages/AfterSaleServicePages?User_deviceId=' + this.data.User_deviceId,
    })
  },
  /*************************获取地理位置************************* */
  GetLoadCity: function() {
    var page = this;
    wx.getLocation({
      type: 'wgs84', //<span class="comment" style="margin:0px;padding:0px;border:none;">默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标</span><span style="margin:0px;padding:0px;border:none;"> </span>  
      success: function(res) {
        // success    
        var longitude = res.longitude
        var latitude = res.latitude
        page.loadCity(longitude, latitude)
      }
    })
  },
  loadCity: function(longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=UNn5Tx1z6MR7tU7zNdyqifgOZ1fUHmnf&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        // success    
        console.log(res);
        // console.log(res.data.result);
        // console.log(res.data.result.addressComponent.city);
        // var city = res.data.result.addressComponent.city;
        // var city = res.data.result.addressComponent.city;
        // page.setData({ currentCity: city });
        page.setData({
          currentCity: res.data.result.addressComponent.city
        })
      },
      fail: function() {
        page.setData({
          currentCity: "获取定位失败"
        });
      },

    })
  },

  /*************************自定义弹框********************************* */
  /**
   * 弹窗
   */
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    this.hideModal();
    console.log("==============" + this.data.inputChangeData)
  },
  inputChange: function(e) {
    this.setData({
      inputChangeData: e.detail.value
    })

  }

  /*************************自定义弹框********************************* */

})