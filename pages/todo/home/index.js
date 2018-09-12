// pages/todo/home/index.js
var that = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: ['你可以删掉我'],
    count: 0,
    inputValue: ''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    let length = that.data.items.length
    that.setData({
      count: length
    })
    wx.getStorage({
      key: 'items',
      success:(res) => {
        let len = res.data.length
        that.setData({
          items: res.data,
          count: len
        })
      }
    })
  },
  // 双向绑定
  bindKeyInput: function (e) {
    that.setData({
      inputValue: e.detail.value
    })
  },
  createTodo:()=>{
    let value = that.data.inputValue
    if (value != '') {
      let items = that.data.items
      items.unshift(that.data.inputValue)
      let length = items.length
      that.setData({
        items: items,
        count: length,
        inputValue: ''
      })
      wx.setStorage({
        key: 'items',
        data: items,
      })
    }
  },
  clickItem: (e) => {
    let item = e.currentTarget.dataset.name
    let items = that.data.items
    items.splice(item, 1)
    let length = items.length
    that.setData({
      items: items,
      count: length
    })
    wx.setStorage({
      key: 'items',
      data: items,
    })
  }
})