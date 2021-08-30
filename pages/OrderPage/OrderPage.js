// pages/OrderPage/OrderPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    var hasLogin = wx.getStorageSync('hasLogin');
    if(hasLogin == true){
      console.log("logined");
      this.setData({
          userInfo:JSON.parse(wx.getStorageSync('userInfo')),
          hasLogin:wx.getStorageSync('hasLogin'),
          token:wx.getStorageSync("token")
      })
      wx.request({
        url: 'http://localhost:8081/orderdetail/proOrderByUserid?userid='+that.data.userInfo.userid,
        method:'GET',
        header:{
          'content-type':'application/json'
        },
        success:function(res){
          that.setData({
            orderList:res.data.data
          })
        }
      })
      //
    }else{
      wx.showModal({
        title:'未登录',
        content:'点击确定跳转到登录界面',
        success(res){
          if(res.confirm){
            wx.redirectTo({
              url: '/pages/LoginPage/LoginPage',
            })
          }
          if(res.cancel){
            wx.redirectTo({
              url: '/pages/LoginPage/LoginPage',
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})