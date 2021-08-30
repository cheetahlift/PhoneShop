// pages/ShoppingCarPage/ShoppingCarPage.js
import Toast from '@vant/weapp/toast/toast'
// import Toast2 from '@vant/weapp/dist/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin:"",
    token:"",
    userInfo:"",
    shoppingList:"",
    IsNull:false,
    multSel:"",
    totalprice:0,
    allowPay:true
  },

  delthis:function(event){
    const { position, instance } = event.detail;
    const that = this
    console.log(event);
    wx.request({
      url: 'http://localhost:8081/shoppingcar/deleteFromCar',
      data:{
        SCid:event.currentTarget.dataset.id
      },
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res);
        instance.close();
        that.onPullDownRefresh();
        Toast.success('已删除');
      }

    })
  },
  onChange:function(event){
    Toast.loading({
      message: 'Loading...',
      forbidClick: true,
      duration:500
    });
    
    console.log(event)
    const that = this;
    // changeNumBySCid
    wx.request({
      url: 'http://localhost:8081/shoppingcar/changeNumBySCid',
      data:{
        SCid:event.currentTarget.dataset.id,
        nums:event.detail
      },
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res);
        that.refresh();
        
        
      }
    });
  },
  onChange2:function(event){
      this.setData({
        multSel:event.detail
      })
      console.log(this.data.multSel);
      var totalprice = 0;
      for(var i = 0;i<this.data.multSel.length;i++){
        var indexNum = this.data.multSel[i];
        totalprice+=(this.data.shoppingList[indexNum].nums*this.data.shoppingList[indexNum].goodprice);
      }
      this.setData({
        totalprice:totalprice
      })
      if(totalprice == 0){
        this.setData({
          allowPay:true
        })
      }else{
        this.setData({
          allowPay:false
        })
      }
  },
  refresh:function(){
    Toast.loading({
      message: 'Loading...',
      forbidClick: true,
      duration:500
    });
      const that = this;
      wx.request({
        url: 'http://localhost:8081/shoppingcar/BaseOnUserId',
        data:{
          userid:that.data.userInfo.userid
        },
        method:'GET',
        header:{
          'content-type':'application/json'
        },
        success:function(res){
          console.log(res);
          if(res.data.data == null){
            that.setData({
              IsNull:false
            })
          }else{
            that.setData({
              shoppingList:res.data.data,
              IsNull:true
            })
          }
          var totalprice = 0;
          for(var i = 0;i<that.data.multSel.length;i++){
            var indexNum = that.data.multSel[i];
            totalprice+=(that.data.shoppingList[indexNum].nums*that.data.shoppingList[indexNum].goodprice);
          }
          that.setData({
            totalprice:totalprice
          })
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
      for(var i = 0;i<this.data.multSel.length;i++){
        var indexNum = this.data.multSel[i];
        var cacheItem = {
          userid:this.data.userInfo.userid,
          goodid:this.data.shoppingList[indexNum].goodid,
          nums:this.data.shoppingList[indexNum].nums
        };
        cacheList[i] = cacheItem;
        wx.request({
          url: 'http://localhost:8081/shoppingcar/deleteFromCar',
          data:{
            SCid:that.data.shoppingList[indexNum].shoppingid
          },
          method:'GET',
          header:{
            'content-type':'application/json'
          },
          success:function(res){
            console.log(res);
          }
        })
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
    var hasLogin = wx.getStorageSync('hasLogin');
      if(hasLogin == true){
        console.log("logined");
        this.setData({
            userInfo:JSON.parse(wx.getStorageSync('userInfo')),
            hasLogin:wx.getStorageSync('hasLogin'),
            token:wx.getStorageSync("token")
        })
        this.refresh();
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
    this.setData({
      multSel:"",
      totalprice:0,
      allowPay:true
    })
    this.refresh();
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