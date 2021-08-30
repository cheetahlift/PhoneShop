// pages/GoodInfoPage/GoodInfoPage.js
import Toast from '@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goodInfo:'',
      nums:1,
      userInfo:"",
      hasLogin:"",
      token:""
  },
  onChange(event) {
    console.log(event.detail);
    this.setData({
      nums:event.detail
    })
  },
  CheckLogin:function(){
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
  goAddCar:function(){
      var that = this;
      wx.request({
        url: 'http://localhost:8081/shoppingcar/addToCar',
        data:{
          userid:that.data.userInfo.userid,
          goodid:that.data.goodInfo.goodid,
          nums:that.data.nums
        },
        method:'PUT',
        header:{
          'content-type':'application/json'
        },
        success:function(res){
          console.log(res);
          Toast.success('成功添加');
        }
      })
  },
  goPurchase:function(){
    const that = this;
    Toast.loading({
      message: 'Loading...',
      forbidClick: true,
      duration:1000
    });
      var cacheList = new Array;
      for(var i = 0;i<1;i++){
        var cacheItem = {
          userid:this.data.userInfo.userid,
          goodid:this.data.goodInfo.goodid,
          nums:this.data.nums
        };
        cacheList[i] = cacheItem;
        
      }
      console.log(cacheList);
      var r = Math.floor(Math.random()*100000);
      var name = "R" + r;
      wx.setStorageSync(name, JSON.stringify(cacheList));
      wx.navigateTo({
        url: '/pages/PurchasePage/PurchasePage?cacheListid='+name
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.request({
      url: 'http://localhost:8081/goods/baseOnId?goodid='+options.goodid,
      method: 'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res.data.data)
        that.setData({
          goodInfo:res.data.data
        })
        that.CheckLogin();
      }
    })
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