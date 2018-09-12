// pages/question/page1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'yes', value: '不扶，就服你' },
      { name: 'no', value: '老实人都说扶' }
    ]

  },
  radioChange: function (e) {
    wx.setStorage({
      key: 'fubufu',
      data: e.detail.value,
    })
    wx.navigateTo({
      url: "page4",
    })
  }
})