// pages/question/page1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '榴莲', value: '榴莲' },
      { name: '苹果', value: '苹果' },
      { name: '橙子', value: '橙子' },
      { name: '香蕉', value: '香蕉' },
      { name: '葡萄', value: '葡萄' },
    ]

  },
  radioChange: function (e) {
    wx.setStorage({
      key: 'fruit',
      data: e.detail.value,
    })
    wx.navigateTo({
      url: "page2",
    })
  }
})