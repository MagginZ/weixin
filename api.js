// 获取小程序全局配置（变量、函数等）
const app = getApp()
// 定义网络请求API地址
const baseURL = ''
// 封装网络请求开始
const http = ({ url, data, method} = {}) => {
  // 添加请求加载等待
  wx.showLoading({
    title: '加载中...'
  })
  // Promise封装处理
  return new Promise((resolve, reject) => {
    wx.request({
      // 请求地址拼接
      url: baseURL + url,
      data: data,
      // 获取请求头配置
      // header: getHeader(),
      method: method,
      // 成功或失败处理
      complete: (res) => {
        // 关闭等待
        wx.hideLoading()
        // 进行状态码判断并处理
        if (res.statusCode === 204) {
          resolve(res)
        } else if (res.statusCode === 401) {
          // 检测到状态码401，进行token刷新并重新请求等操作
          // refreshToken().then(()=>_refetch(url,data,method)).then(resolve)
          // 401刷新token暂时弃掉，改为退出登录
          app.globalData.userInfo = null
          app.globalData.profile = null
          app.globalData.userToken = null
          wx.clearStorage()
          wx.clearStorageSync()
          showToast("你的信息已过期，请重新登录")
        } else if (res.data.code !== 200) {
          // 小程序Toast提示
          let title = res.data.err_msg
          showToast(title)
        } else if (res.data.code === 200) {
          resolve(res)
        } else if (res.statusCode === 403) {
          app.globalData.userInfo = null
          app.globalData.profile = null
          app.globalData.userToken = null
          wx.clearStorage()
          wx.clearStorageSync()
          showToast("你的信息已过期，请重新登录")
        } else {
          reject(res)
        }
      }
    })
  })
}
// 添加请求toast提示
const showToast = title => {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: 1500,
    mask: true
  });
}

// 进行url字符串拼接
const getUrl = url => {
  if (url.indexOf('://') == -1) {
    url = baseURL + url
  }
  return url
}
//获取用户userToken
function getHeader() {
  if (wx.getStorageSync('userToken')) {
    var token = wx.getStorageSync('userToken')
    let auth = {
      'Authorization': token.token_type + " " + token.access_token
    }
    return auth
  }
}
// 重构请求方式
const _fetch = (content) => {
  return http({
    url: content.url,
    data: content.data,
    method: content.method
  })
}
// 添加刷新之后的操作处理方法
const refreshToken = () => {
  return new Promise((resolve, reject) => {
    // 获取token
    var token = wx.getStorageSync('userToken')
    // 设置请求data
    let params = {
      refresh_token: token.refresh_token
    }
    // 进行token刷新请求
    wx.request({
      url: getUrl('/app/connect/refresh'),
      data: params,
      // 设置请求header 鉴权
      header: {
        'Authorization': token.token_type + " " + token.access_token
      },
      method: 'post',
      // 请求响应处理
      complete: (res) => {
        if (res.data.code === 200) {
          // 全局存储token
          app.globalData.usertToken = res.data.data
          // Storage存储token
          wx.setStorage({
            key: "userToken",
            data: res.data.data,
            // 存储成功处理
            success: function () {
              resolve()
            }
          })
        }
      }
    })
  });
}
const _refetch = (url, data, method) => {
  return http({
    url: url,
    data: data,
    method: method
  })
}
// get、post、put、delete、_refetch方法暂不处理
const _get = (url, params = {}) => {
  return http({
    url,
    params
  })
}
const _post = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'post'
  })
}
const _put = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'put'
  })
}
const _delete = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'delete'
  })
}
module.exports = {
  baseURL,
  refreshToken,
  _fetch,
  _refetch,
  _get,
  _post,
  _put,
  _delete
}
