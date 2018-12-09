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
    ],
    lookBtn:false,
    lookList:[]
  },
  onLoad: function (options) {
    this.setData({
      soldout: options.Soldout
    })
    this.listLoad()
  },
  //获取排行榜
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
          let list = res.data.data.firstten;
          let arry = []
          for (let i = 0; i < list.length; i++) {
            arry.push({
              name: list[i].split("：")[0],
              count: list[i].split("：")[1]
            })
          }
          that.setData({ lookList: arry })
          if (list.length > 3){
            that.setData({ lookBtn:true})
            arry.length = 3
          }
          that.setData({
            rankList: arry
          })
          // console.log(that.data.lookList)
          // console.log(that.data.rankList)
        }
      }
    })
  },
  //查看更多
  lookBtnFn(){
    let that = this;
    that.setData({
      lookBtn: false,
      rankList: that.data.lookList
    });
  }
})