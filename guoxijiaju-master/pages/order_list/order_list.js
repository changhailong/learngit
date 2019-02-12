var app = getApp()
Page({
  data:{
    
  },
  onShow: function () {
    wx.showLoading();
    
    var that = this
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo
            });
          }
        });

        wx.request({
          url: 'https://api.guoxijiaju.cn/order_list/' + res.code,
          data: {
            order_type: 'my'
          },
          success: function (res) {
            wx.hideLoading();
            that.setData({
              orderList: res.data
            })
            console.log(res)
          }
        });
      }
    })
  }
})
