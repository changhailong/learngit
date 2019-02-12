var app = getApp()
Page({
	data: {
    balance:0,
    freeze:0,
    score_sign_continuous:0
  },
	onLoad() {

	},	
  onShow() {
    this.getUserInfo();
  },
  getUserInfo: function (cb) {
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
          url: 'https://api.guoxijiaju.cn/user/' + res.code,
          success: function (res) {
            that.setData({
              userData: res.data
            })
          }
        });
      }
    })
  },
  addOrder: function() {
    // console.log("addOrder")
  }
})