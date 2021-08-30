// pages/RecPage/RecPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['https://img.alicdn.com/tfs/TB1FjZ7VWL7gK0jSZFBXXXZZpXa-520-280.png', 'https://gtms01.alicdn.com/tps/i1/TB1r4h8JXXXXXXoXXXXvKyzTVXX-520-280.jpg', 'https://img.alicdn.com/imgextra/i4/734584252/O1CN01DhyN1E1hHSlwPN4RX_!!734584252-0-alimamazszw.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,

    productInfo:[
      {
        url:'https://wx4.sinaimg.cn/mw690/b0bf4036gy1gri6szax4uj20m80m8qm1.jpg',
        name:'华为 HUAWEI Mate 40',
        detail:'华为',
        price:'4999',
        goodid:9001
      },
      {
        url:'https://wx3.sinaimg.cn/mw690/b0bf4036gy1gri6wdyj7nj20m80m8mzq.jpg',
        name:'小米 小米10S',
        detail:'小米',
        price:'3299',
        goodid:9007
      },
      {
        url:'https://wx1.sinaimg.cn/mw690/b0bf4036gy1grjgc50kqxj20m80m8jwd.jpg',
        name:'苹果 iPhone 12 Pro Max',
        detail:'苹果',
        price:'9299',
        goodid:9011
      },
      {
        url:'https://wx2.sinaimg.cn/mw690/b0bf4036gy1gri6vw3ezzj20ly0i2tfp.jpg',
        name:'三星 三星Galaxy S21',
        detail:'三星',
        price:'4799',
        goodid:9013
      },
      {
        url:'https://wx2.sinaimg.cn/mw690/b0bf4036gy1grjgcqgk1ej20u00u0q9w.jpg',
        name:'一加 OnePlus 8T',
        detail:'一加',
        price:'2599',
        goodid:9016
      }
    ]
    // userInfo:{
    //   userid:"",
    //   username:"",
    //   password:""
    // },
    // hasLogin:"",
    // token:""
  },
  goSeeDetail:function(e){
    wx.navigateTo({
      url: '/pages/GoodInfoPage/GoodInfoPage?goodid='+e.currentTarget.dataset.id,
    })
  },
  goSearch:function(){
    wx.navigateTo({
      url: '/pages/SearchPage/SearchPage',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   hasLogin:wx.getStorageSync('hasLogin'),
    //   token:wx.getStorageSync('token'),
    //   userInfo:JSON.parse(wx.getStorageSync('userInfo'))
    // })
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