// pages/question/page4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fruit: '',
    book: '',
    fubufu:''
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getStorage({
      key: 'fruit',
      success:(res)  => {
        this.setData ({
          fruit: res.data
        })
      },
    }),
      wx.getStorage({
      key: 'book',
        success: (res) => {
          this.setData({
            book: res.data
          })
        },
      }),
      wx.getStorage({
        key: 'fubufu',
        success: (res) => {
          let fubufu = '不服'
          if (res.data == 'no') {
            fubufu = '不服憋着'
          } else {
            fubufu = '这里有个老实人，大家快来欺负他'
          }
          this.setData({
            fubufu: fubufu
          })
        }
      })
  },
  confirm: ()=>{
    wx.showModal({
      title: '提示',
      content: "确定要把这玩意儿给提交了？",
      success: (res)=>{
        if (res.confirm) {
          wx.showModal({
            title: '提示',
            content: '建议选择取消',
            confirmColor: '#fff'
          })
        } else {
          wx.showToast({
            title: 'OK你是个听话的小伙子',
            icon: 'none'
          })
        }
      }
    })
  },
  goon: ()=> {
    wx.showToast({
      title: '我程序就写这么多你还想继续啥？',
      icon: 'none'
    })
  }
})