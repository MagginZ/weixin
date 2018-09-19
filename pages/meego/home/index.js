// pages/meego/home/index.js
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: "5000",
    priceNow: "1.2",
    key: "4545456456"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.getIndexData()
  },
  getIndexData: function(){
    api._fetch({
      url: '/app/userreward/index',
      method: 'post'
    }).then(res => {
      console.log(res.data)
      // wx.setStorage({
      //   key: 'userInfo',
      //   data: res,
      // })
    })
  }
})