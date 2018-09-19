// pages/meego/login/index.js
const api = require('../../../utils/api.js')
Page({
  submit: function(e) {
    let params = e.detail.value
    api._fetch({
      url: '/app/connect/signin',
      data: params,
      method: 'post'
    }).then(res => {
      wx.setStorage({
        key: 'loginToken',
        data: res.data.data
      })
      api.showToast("登录成功")
      wx.switchTab({
        url: '/pages/meego/home/index',
      })
    })
  }
})