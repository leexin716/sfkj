//index.js
//获取应用实例
const app = getApp()
var QR = require("../../utils/qrcode.js");
Page({
  data: {
    // 测试图片
    TestImg: "http://qrcode.waterever.cn/image/home_icon_order.png",
    /*******二维码生成器************ */
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',
    placeholder: '',

    /*******二维码生成器************ */
    userInfo: {
      avatarUrl: '', //用户头像
      nickName: '' //用户名称
    },
    UserMoney: '0.00', //我的钱包
    OutHuo: '0', //我的出货
    MyAssistant: '0', //我的顾客
    PutHuo: '0', //我的库存
    Userranking: '', //排名
    UsercompanyName: '', //公司名称
    SurplusOne: 0, //已租出设备
    Surplus: 0, //剩余设备
    createDate: '', //加入时间
    Phone: '', //手机号
    QrCode: '', //默认二维码生成文本
    BuHuoContetn: '',
    ViewContetnStatus: 0,
    ZhuLi: 12, //助理
    TopTrue: 0,
    MyAssistantCount: '',
    TrueAndFalse: false, //用于判断是页面数据是用户信息还是代理信息

  },
  //顶部信息点击事件
  bindViewTap: function() {
    console.log("头像点击事件")
  },
  onShow: function() {

    console.log("我的页面显示")

    this.GetUserImgName(); //获取用户微信头像

    this.MyPageGetHttpData();
  },
  onLoad: function() {

  },


  // 获取用户头像、昵称
  GetUserImgName: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 我的钱包
  GoToMyWallet: function() {

      // if (getApp().globalData.UserStatus == 3101) {
      //   wx.redirectTo({
      //     url: '../Authentication/Authentication',
      //   })
      // } else {
      //   wx.showToast({
      //     title: '暂无交易记录',
      //     icon: 'none'
      //   })
      // }
      wx.navigateTo({
        url: '../UserWallet/UserWallet',
      })
    }

    ,



  /*******二维码生成器************ */
  //适配不同屏幕大小的canvas
  setCanvasSize: function() {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686; //不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width; //canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function(url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => {
      this.canvasToTempImage();
    }, 1000);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function() {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function(res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          // canvasHidden:true
        });
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片


  // previewImg: function(e) {
  //   var img = this.data.imagePath;
  //   console.log('图片路径.....' + img);
  //   wx.previewImage({
  //     current: img, // 当前显示图片的http链接
  //     urls: [img] // 需要预览的图片http链接列表
  //   })
  // },
  previewImg: function() {

    getApp().globalData.SuperiorQrCode = this.data.QrCode
    wx.navigateTo({
      url: '../PreviewImgPage/PreviewImgPage',
    })
  },
  previewImg_btn: function() {

    wx.showToast({
      title: '暂无代理权限',
      icon: 'none',
    })
  },

  /*******二维码生成器************ */


  // 进入代理商进货支付页面
  GoToApplicationEquipment: function() {
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
    } else {
      // wx.navigateTo({
      //   url: '../ApplicationEquipment/ApplicationEquipment?PutHuo=' + this.data.PutHuo,
      // })
    }

  },





  // 个人页面网络请求

  MyPageGetHttpData: function() {
    wx.showLoading({
      title: '加载中',
    })
    console.log("getApp().globalData.UserId=========" + getApp().globalData.UserId +
      "getApp().globalData.token=============" + getApp().globalData.token +
      "getApp().globalData.UserStatus=============" + getApp().globalData.UserStatus)
    var that = this;


    if (getApp().globalData.UserStatus == 3104) {
      that.setData({
        TrueAndFalse: true
      })
    } else if (getApp().globalData.UserStatus == 3101) {
      that.setData({
        TopTrue: 1
      })
      if (getApp().globalData.UserPageType == 3) {
        that.setData({
          TrueAndFalse: true
        })
      } else {
        that.setData({
          TrueAndFalse: false
        })
      }
    } else {

    }




    if (getApp().globalData.UserId == '') {
      wx.hideLoading();

    } else {

      var myurl = 'https://japi.waterever.cn/user/agent_personal/{id}'
      var id = getApp().globalData.UserId

      wx.request({
        // url: myurl + id,
        url: "https://japi.waterever.cn/user/agent_personal/" + id,
        header: {
          Authorization: getApp().globalData.token,
          'content-type': 'application/json' // Get默认值
          // "Content-Type": "application/x-www-form-urlencoded" //POST默认值
        },
        // method: "POST",
        data: {
          // id: getApp().globalData.UserId
        },
        success: function(res) {
        
          console.log(res)
          console.log(res.data.data.balance)
          console.log("===========二维码地址===========" + res.data.data.qrcode)
          if(res.data.code==0){
            that.setData({
              UserMoney: res.data.data.balance,
              OutHuo: res.data.data.outSold,
              MyAssistant: res.data.data.count,
              PutHuo: res.data.data.stock,
              Userranking: res.data.data.ranking,
              UsercompanyName: res.data.data.companyName,
              SurplusOne: res.data.data.surplus,
              Surplus: 20000 - res.data.data.surplus,
              Phone: res.data.data.phone,
              QrCode: res.data.data.qrcode,
              MyAssistantCount: res.data.data.assistantCount
            })


            if (res.data.data.qrcode == null) {

            } else {
              /*******二维码生成器************ */
              // 页面初始化 options为页面跳转所带来的参数
              var size = that.setCanvasSize(); //动态设置画布大小
              var initUrl = res.data.data.qrcode;
              that.createQrCode(initUrl, "mycanvas", size.w, size.h);
              /*******二维码生成器************ */
            }

            // 时间戳转换
            var createTimes = res.data.data.createDate / 1000

            that.TimeSet(createTimes)
            wx.hideLoading();
          }else{
            wx.hideLoading();
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
          }

      

        }

      })


    }
  },







  // 时间戳转换
  TimeSet: function(timestamp3) {
    var that = this;
    var newDate = new Date();
    newDate.setTime(timestamp3 * 1000);
    Date.prototype.format = function(format) {
      var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
            date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
      }
      return format;
    }

    // 时间转换
    // console.log(newDate.format('yyyy-MM-dd h:m:s'));

    that.setData({
      createDate: newDate.format('yyyy-MM-dd'),
    })

  },

  GoToXieYiDaliTwo: function() {
    wx.navigateTo({
      url: '../XieYiDaliTwo/XieYiDaliTwo',
    })
  },

  // 我的助理
  GoToZhuLi: function() {

    if (getApp().globalData.UserStatus == 3101) {
      wx.navigateTo({
        url: '../ZhuLi/ZhuLi',
      })
    } else {
      wx.showToast({
        title: '请先申请为代理',
        icon: 'none'
      })
    }

  },

  //代理指南
  GoToDaiLiGuide: function() {
    wx.navigateTo({
      url: '../DaiLiGuide/DaiLiGuide'
    })
  },

  // 客户管理
  GoToKeHuAdministration: function() {
    getApp().globalData.SuperiorQrCode = this.data.QrCode
    if (this.data.QrCode == null) {
      wx.showToast({
        title: '请先申请为代理',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: '../KeHuAdministration/KeHuAdministration',
      })
    }

  },
  // 我的消息
  GoToMyNews: function() {
    if (getApp().globalData.UserStatus == 3101) {
      wx.navigateTo({
        url: '../MyNews/MyNews',
      })
    } else {
      wx.showToast({
        title: '请先申请为代理',
        icon: 'none'
      })
    }

  },
  // // 售后服务
  // GoToAfterSaleServicePages: function() {

  //   // wx.navigateTo({
  //   //   url: '../AfterSaleServicePages/AfterSaleServicePages',
  //   // })

  //   if (getApp().globalData.UserStatus == 3101) {
  //     wx.navigateTo({
  //       url: '../AfterSaleServicePages/AfterSaleServicePages',
  //     })
  //   } else {
  //     wx.showToast({
  //       title: '请先申请为代理',
  //       icon: 'none'
  //     })
  //   }



  // }
})