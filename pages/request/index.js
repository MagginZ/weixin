// pages/request/index.js
const api = require('../../api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: 'hello',
    listData: {}
  },
  formSubmit: function (e) {
    var that = this
    let params = e.detail.value
    api._fetch({
      url: '/app/connect/signin',
      data: params,
      method: 'post'
    }).then(res => {
      that.setData({
        listData: res.data.data,
        message: '请求成功'
      })
    })
    // wx.request({
    //   url: '',
    //   data: params,
    //   method: 'post',
    //   complete: (res) => {
    //     console.log(res)
    //   }
    // })
  }

})
