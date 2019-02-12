//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  onLoad: function () {
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
  bindSave: function (e) {
    var that = this;
    var content = e.detail.value.content;
    var contact_name = e.detail.value.linkMan;
    var contact_mobile = e.detail.value.mobile;
    var address = e.detail.value.address;

    if (content == "") {
      wx.showModal({
        title: '提示',
        content: '请填写订单信息',
        showCancel: false
      })
      return
    }

    if (contact_name == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }

    if (contact_mobile == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return
    }

    if (!(/^1[34578]\d{9}$/.test(contact_mobile))) {
      wx.showModal({
        title: '提示',
        content: '手机号码有误，请确认',
        showCancel: false
      })
      return
    }

    if (address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写地址',
        showCancel: false
      })
      return
    }

    wx.showModal({
      title: '确认提交？',
      showCancel: true,
      success: function(res){
        if(res.cancel) {
          return
        } else {
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
                url: 'https://api.guoxijiaju.cn/order/' + res.code,
                method: 'POST',
                data: {
                  content: content,
                  contact_name: contact_name,
                  contact_mobile: contact_mobile,
                  address: address
                },
                success: function (res) {
                  if (res.data.code != 0) {
                    // 登录错误
                    wx.hideLoading();
                    wx.showModal({
                      title: '失败',
                      content: res.data.msg,
                      showCancel: false
                    })
                    return;
                  } else {
                    wx.showToast({
                      title: '提交成功',
                    })
                    that.setData({
                      orderData: ''
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  }
})
