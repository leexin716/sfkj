var md5 = require('../../utils/md5.min.js')
Page({
  data: {
    pickerImgs: 'http://qrcode.waterever.cn/image/btn_arrow.png',
    currentTab: 0,
    CityAddress: ['    浙江省', '宁波市', '鄞州区'], //个人认证默认省市区

    /*******个人认证************ */
    UserName: '', //姓名
    Phone: '', //手机号
    MyID: '', //身份证
    UserAddress: '', //个人认证地区
    DetailedAddress: '', //详细地址
    /*******个人认证************ */

    /*******公司认证************ */
    UserNameTwo: '',
    PhoneTwo: '',
    MyIdTwo: '',
    DetailedAddressTwo: '',
    CorporateName: '',
    CorporateAddress: '',
    LegalPerson: '',
    OverSrc: '',
    OverSrcList: [],

    /*******公司认证************ */
  },
  /*** 滑动切换tab***/
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  /*** 点击tab切换***/
  swichTap: function(e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
    console.log(e.target.dataset.current)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**************************获取输入框输入的内容 *******************************/
  UserNmaeInput: function(e) {
    this.setData({
      UserName: e.detail.value
    })
  },
  PhoneInput: function(e) {
    this.setData({
      Phone: e.detail.value
    })
  },
  MyIdInput: function(e) {
    this.setData({
      MyID: e.detail.value
    })
  },


  DetailedAddressInput: function(e) {
    this.setData({
      DetailedAddress: e.detail.value
    })
  },

  // 个人认证按钮点击事件
  PersonalOver: function() {
    var that = this;
    var UserAddress = this.data.CityAddress[0] + "" + this.data.CityAddress[1] + "" + this.data.CityAddress[2]
    console.log("输入框内容+" +
      that.data.UserName + "===========" +
      that.data.Phone + "===========" +
      that.data.MyID + "===========" +
      UserAddress + "===========" +
      that.data.DetailedAddress + "===========" +
      getApp().globalData.token)


    wx.request({
      url: 'https://japi.waterever.cn/user/register_agent_user',
      header: {
        // 'content-type': 'application/json' // Get默认值
        Authorization: getApp().globalData.token,
        "Content-Type": "application/x-www-form-urlencoded" //POST默认值

      },
      method: "POST",
      data: {

        id: getApp().globalData.UserId,
        name: that.data.UserName,
        phone: that.data.Phone,
        id_card: that.data.MyID,
        area: UserAddress,
        address: that.data.DetailedAddress,
        referrer_id: '110'
      },
      success: function(res) {
        console.log(res)
        console.log(res.data)
        if (res.data.code == 0) {
          getApp().globalData.HomeTokenHttpStatus = 1
          getApp().globalData.UserStatus = 3103
          wx.showModal({
            title: '恭喜你',
            content: '认证成功',
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../ApplicationEquipment/ApplicationEquipment'
                })

              } else if (res.cancel) {
                wx.redirectTo({
                  url: '../ApplicationEquipment/ApplicationEquipment'
                })
              }
            }
          })
        } else {
          wx.showModal({

            content: res.data.msg,
            success(res) {
              if (res.confirm) {

              } else if (res.cancel) {

              }
            }
          })
        }




      }

    })

  },





  /***********************公司认证*************************** */

  UserNameTwoInput: function(e) {
    this.setData({
      UserNameTwo: e.detail.value
    })
  },
  PhoneTwoInput: function(e) {
    this.setData({
      PhoneTwo: e.detail.value
    })
  },
  MyIdTwoInput: function(e) {
    this.setData({
      MyIdTwo: e.detail.value
    })
  },
  DetailedAddressTwoInput: function(e) {
    this.setData({
      DetailedAddressTwo: e.detail.value
    })
  },
  CorporateNameInput: function(e) {
    this.setData({
      CorporateName: e.detail.value
    })
  },
  CorporateAddressInput: function(e) {
    this.setData({
      CorporateAddress: e.detail.value
    })
  },

  LegalPersonInput: function(e) {
    this.setData({
      LegalPerson: e.detail.value
    })
  },



  PersonalTwoOver: function() {
    var that = this;
    var UserAddress = that.data.CityAddress[0] + "" + that.data.CityAddress[1] + "" + that.data.CityAddress[2]
    console.log(
      that.data.UserNameTwo + '===' +
      that.data.PhoneTwo + '===' +
      that.data.MyIdTwo + '===' +
      UserAddress + '===' +
      that.data.DetailedAddressTwo + '===' +
      that.data.CorporateName + '===' +
      that.data.CorporateAddress + '===' +
      that.data.LegalPerson + '===' +
      that.data.OverSrcList[0])


    // wx.request({
    //   url: 'https://japi.waterever.cn/user/register_agent_company',
    //   header: {
    //     // 'content-type': 'application/json' // Get默认值
    //     Authorization: getApp().globalData.token,
    //     "Content-Type": "application/x-www-form-urlencoded" //POST默认值
    //   },
    //   method: "POST",
    //   data: {
    //     id: getApp().globalData.UserId,
    //     name: that.data.UserNameTwo,
    //     phone: that.data.PhoneTwo,
    //     id_card: that.data.MyIdTwo,
    //     area: UserAddress,
    //     address: that.data.DetailedAddressTwo,
    //     Name: that.data.CorporateName,
    //     Address: that.data.CorporateAddress,
    //     IegalPerson: that.data.LegalPerson,
    //     BusinessLicense: that.data.OverSrcList[0],
    //     referrer_id: '222',
    //   },
    //   success: function(res) {
    //     console.log(res)


    //   }

    // })


    wx.uploadFile({
      url: 'https://japi.waterever.cn/user/register_agent_company',
      header: {
        // 'content-type': 'application/json' // Get默认值
        Authorization: getApp().globalData.token,
        "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      filePath: that.data.OverSrcList[0],
      name: 'BusinessLicense',
      formData: {
        id: getApp().globalData.UserId,
        name: that.data.UserNameTwo,
        phone: that.data.PhoneTwo,
        id_card: that.data.MyIdTwo,
        area: UserAddress,
        address: that.data.DetailedAddressTwo,
        Name: that.data.CorporateName,
        Address: that.data.CorporateAddress,
        IegalPerson: that.data.LegalPerson,
        referrer_id: '222',
      },
      success(res) {
        // const data = res.data
        //do something
        console.log(res.data)
        var jsonObj = JSON.parse(res.data)
        console.log(jsonObj.code)
        if (jsonObj.code == 0) {
          getApp().globalData.HomeTokenHttpStatus = 1
          getApp().globalData.UserStatus = 3103
          wx.showModal({
            title: '恭喜你',
            content: '认证成功',
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../ApplicationEquipment/ApplicationEquipment'
                })
              } else if (res.cancel) {
                wx.redirectTo({
                  url: '../ApplicationEquipment/ApplicationEquipment'
                })
              }
            }
          })

          // wx.switchTab({
          //   url: '../HomePage/HomePage'
          // });
        } else {
          wx.showToast({
            title: jsonObj.msg,
            icon: 'none',
          })
        }
      }
    })

  },


  test: function() {
    var that = this;
    wx.chooseImage({
      success: function(res) {
        var tempFilePaehs = res.tempFilePaths;
        console.log("图片路径" + res.tempFilePaths)
        that.setData({
          OverSrcList: res.tempFilePaths
        })
      },
    })
  },


  previewImg: function(e) {
    var img = this.data.OverSrcList[0];

    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
    console.log('图片路径.....' + img);
  },








  // 城市选择器
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      CityAddress: e.detail.value,
    })
  },

})