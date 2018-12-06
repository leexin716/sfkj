Page({

  /**
   * 页面的初始数据
   */
  data: {
    ArrayData: [{}],
    UserType:'',
    ViewHidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log("========================="+options.type)
    this.setData({
      UserType: options.type
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
    this.GetHttpPurseDetailData();
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
  GetHttpPurseDetailData: function() {
    var that=this;
    wx.request({
      url: 'https://japi.waterever.cn/user/transaction_details',
      header: {
        Authorization: getApp().globalData.token,
        // 'content-type': 'application/json' // Get默认值
        "Content-Type": "application/x-www-form-urlencoded" //POST默认值
      },
      method: "POST",
      data: {
        id: getApp().globalData.UserId,
        type: that.data.UserType
      },
      success: function(res) {
        console.log(res)

        console.log(res.data.data)
        console.log()
        if (res.data.data.length>0){
          that.setData({
            ViewHidden: true
          })
        }else{
          that.setData({
            ViewHidden: false
          })
          console.log("==========ViewHidden===========" + that.data.ViewHidden)
        }

        for (let i = 0; i < res.data.data.length; i++) {
          // 时间戳转换
          var timestamp3 = res.data.data[i].createDate / 1000;
          var newDate = new Date();
          newDate.setTime(timestamp3 * 1000);
          Date.prototype.format = function (format) {
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
          res.data.data[i]['createDate'] = newDate.format('yyyy-MM-dd ss:hh:mm');
        }
        that.setData({
          ArrayData: res.data.data
        })
      }

    })

  }
})