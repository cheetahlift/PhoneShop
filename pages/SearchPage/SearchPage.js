// pages/SearchPage/SearchPage.js

import Toast from '@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKeyWord:"",
    goodList:""
  },
  serInput:function(e){
    
    this.setData({
      searchKeyWord:e.detail.value
    })

  },
  goSeeDetail:function(e){
      console.log(e);
      var goodid = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/GoodInfoPage/GoodInfoPage?goodid='+goodid,
      })
  },

  goSearch:function(){
    const that = this;
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration:500
    });
    wx.request({
      url: 'http://localhost:8081/goods/baseOnType?GoodType='+this.data.searchKeyWord,
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        that.setData({
          goodList:res.data.data
        })
      }
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