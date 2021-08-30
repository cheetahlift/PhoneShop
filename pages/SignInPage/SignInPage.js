
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:""

  },
  nameIn:function(e){
    this.setData({
      username:e.detail.value
    })

  },
  passIn:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  goSign:function(){
    const _this = this
    if(this.data.username.length == 0 || this.data.password.length == 0){
      wx.showModal({
        title:'提示',
        content:'请输入用户名或密码',
        cancelColor: 'cancelColor',
        showCancel:false
      })
    }else{
      var that = this;
      wx.request({
        url: 'http://localhost:8081/user/addUser',
        data:{
          username:this.data.username,
          password:this.data.password
        },
        method: 'PUT',
        header:{
          'content-type':'application/json'
        },
        success:function(res){
          wx.showModal({
            title:'成功注册',
            content:'点击确定跳转到登录界面',
            success(res){
              if(res.confirm){
                wx.redirectTo({
                  url: '/pages/LoginPage/LoginPage',
                })
              }
              if(res.cancel){

              }
            }
          })
        },
        fail:function({errMsg}){
          Toast.fail('失败文案');
          console.log(errMsg);
        }
      })
    }
  },
  goBack:function(){
    wx.redirectTo({
      url: '/pages/LoginPage/LoginPage',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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