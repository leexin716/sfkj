var QR = require("../../utils/qrcode.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*******二维码生成器************ */
    canvasHidden: false,
    maskHidden: true,
    imagePath: [],
    placeholder: '',
    /*******二维码生成器************ */
    ZhuliQrCode: '',
    ArrayLength: '',
    ArrayData: [{}],
    showModal: false,
    inputChangeData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  // this.onShow();
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
    var that = this;

    that.GetHttp();


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











  // 加载页面网络数据
  GetHttp: function() {
    var that = this;
    wx.request({
      url: 'https://japi.waterever.cn/user/assistant_data',
      header: {
        Authorization: getApp().globalData.token,
        'content-type': 'application/json' // Get默认值
        // "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      // method: "POST",
      data: {
        id: getApp().globalData.UserId,
      },
      success: function(res) {
        console.log(res)
        console.log(res.data.code)
        if (res.data.code == 0) {


     

          res.data.data.data.push({
            count: -1,
          })

          // console.log("+++++++++++++++++++++++++++" + res.data.data.url)
          that.setData({
            ZhuliQrCode: res.data.data.url,
            ArrayLength: res.data.data.data.length,
            ArrayData: res.data.data.data,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }




      }

    })
  },





  previewImg: function(e) {
    // console.log("-------------------------" + this.data.imagePath + 1 + "================" + e.currentTarget.dataset.tag)
    // console.log("=========图片路径=============="+imagePath)
    var img = this.data.ArrayData[e.currentTarget.dataset.tag].url;
    console.log('图片路径.....' + img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },

/****************************自定义弹框************************** */

  /**
    * 弹窗
    */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var that = this;
    that.hideModal();
    console.log("==============" + that.data.inputChangeData)
    if (that.data.inputChangeData.length<2){
      wx.showToast({
        title: '请输入姓名',
        icon:'none'
      })
    }else{
    wx.request({
      url: 'https://japi.waterever.cn/user/add_assistant',
      header: {
        Authorization: getApp().globalData.token,
        'content-type': 'application/json' // Get默认值
        // "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      // method: "POST",
      data: {
        user_id: getApp().globalData.UserId,
        name:that.data.inputChangeData,
        id_card:-1
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 0) {
          // that.onShow();
          that.GetHttp();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  }

  },
  // 输入框内容
  inputChange: function (e) {
    this.setData({
      inputChangeData: e.detail.value
    })

  }

})