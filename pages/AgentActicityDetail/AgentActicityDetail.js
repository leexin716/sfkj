// pages/AgentActicityDetail/AgentActicityDetail.js
Page({
  data: {
    soldout:'',
    firsttenData:[],
    rankList:[
      {
        name:'1'
      },
      {
        name:'2'
      }
    ]
  },
  onLoad: function (options) {
    this.setData({
      soldout: options.Soldout
    })
    this.listLoad()
  },
  onReady: function () {

  },
  listLoad(){
    let that = this;
    wx.request({
      url: 'https://japi.waterever.cn/user/home_data',
      header: {
        Authorization: getApp().globalData.token,
        'content-type': 'application/json'
      },
      method: "GET",
      data: {
        test: 0
      },
      success: function (res) {
        if(res.data.code == 0){
          let list = res.data.data.firstten
          let arry = []
          for (let i = 0; i < list.length;i++){
            arry.push({
              name: list[i].split("：")[0],
              count: list[i].split("：")[1]
            })
          }
          that.setData({
            rankList: arry
          })
        }
      }
    })
  }
})