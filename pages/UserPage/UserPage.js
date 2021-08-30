// pages/UserPage/UserPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin:"",
    token:"",
    userInfo:"",
    userpic:"https://wx1.sinaimg.cn/mw2000/0072cXExly8fn7pe13bekj30ro0rota5.jpg",
    
    orderIcon:[
      {
        title:'待支付',
        icon:'pending-payment'
      },
      {
        title:'待发货',
        icon:'send-gift-o'
      },
      {
        title:'待收货',
        icon:'logistics'
      },
      {
        title:'待评价',
        icon:'edit'
      }
    ]
   
  },
  takephoto:function(){
    const _this=this
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      sourceType:'camera',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        _this.setData({
          userpic:tempFilePaths[0]
        })
      }
    })
  },
  goChange:function(){
    console.log('click')
    this.setData(
      {
        ifName:true
      }
    )
  },
  confirm:function(){
    this.setData(
      {
        ifName:false
      }
    )
    const _this = this
    console.log(getApp().globalData.userid)
    db.collection('usertable').where({
      _id:getApp().globalData.userid
    }).update({
      data:{
        username : _this.data.username
      }
      
    })
  },
  goAddressPage: function(){
      wx.navigateTo({
        url: '/pages/AddressPage/AddressPage'
      })
  },
  goOrderPage:function(){
      wx.navigateTo({
        url: '/pages/OrderPage/OrderPage'
      })
  },
  logOut:function(){
      wx.removeStorageSync('hasLogin');
      wx.removeStorageSync('token');
      wx.removeStorageSync('userInfo');
      wx.redirectTo({
        url: '/pages/LoginPage/LoginPage'
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var hasLogin = wx.getStorageSync('hasLogin');
      if(hasLogin == true){
        console.log("logined");
        this.setData({
            userInfo:JSON.parse(wx.getStorageSync('userInfo')),
            hasLogin:wx.getStorageSync('hasLogin'),
            token:wx.getStorageSync("token")
        })
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