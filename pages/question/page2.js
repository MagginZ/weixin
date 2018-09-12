// pages/question/page1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '悬疑侦探', value: '悬疑侦探' },
      { name: '青春言情', value: '青春言情' },
      { name: '武侠玄幻', value: '武侠玄幻' },
      { name: '烧脑推理', value: '烧脑推理' },
      { name: '恐怖故事', value: '恐怖故事' },
    ]

  },
  radioChange: function (e) {
    wx.setStorage({
      key: 'book',
      data: e.detail.value,
    })
    wx.navigateTo({
      url: "page3",
    })
  }
})