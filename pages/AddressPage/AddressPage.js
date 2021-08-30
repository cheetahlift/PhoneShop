// pages/AddressPage/AddressPage.js
import Toast from '@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLogin:"",
    token:"",
    userInfo:"",
    addressList:"",
    hasAddress:false,
    newAddress:"",
    show:false,
    activeNames: [],
    showContent:"",
    addressid:""
    
  },
  showPopup(e) {
    const that = this;
    this.setData({
      addressid:e.currentTarget.dataset.id 
    })
    wx.request({
      url: 'http://localhost:8081/address/baseOnAddressid',
      data:{
        addressid:that.data.addressid
      },
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res);
        that.setData({ 
          show: true,
          showContent:res.data.data.address
        });
        
      }
    })
    
  },
  showInput:function(e){
    this.setData({
      showContent:e.detail.value
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  updateAddress:function(){
    const that = this;
      var addressItem = {
        addressid:this.data.addressid,
        userid:this.data.userInfo.userid,
        address:this.data.showContent
      };
      wx.request({
        url: 'http://localhost:8081/address/updateAddressByAddressid',
        data:addressItem,
        method:'PUT',
        header:{
          'content-type':'application/json'
        },
        success:function(res){
          Toast.success('修改成功');
          console.log(res);
          that.setData({
            show:false
          });
          that.refresh();
        }
      })
    
  },
  

  onChangeCollapse(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  onChange:function(event){
    console.log(event.detail);
    this.setData({
      newAddress:event.detail
    })
  },
  godelete:function(e){
    console.log(e);
    const that = this;
    var addressid = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://localhost:8081/address/delByAddressID',
      data:{
        addressid:addressid
      },
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res);
        that.refresh();
        that.setData({
          activeNames: []
        });
        Toast.success('删除成功');
        
      }
    })
  },
  addNewAddress:function(e){
    
    console.log(this.data.newAddress);
    const that = this;
    wx.request({
      url: 'http://localhost:8081/address/newAddress',
      data:{
        userid:this.data.userInfo.userid,
        address:this.data.newAddress
      },
      method:'PUT',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res);
        that.refresh();
        that.setData({
          activeNames: []
        });
        Toast.success('添加成功');
        
      }
    })
  },
  refresh:function(){
    const that = this;
    var hasLogin = wx.getStorageSync('hasLogin');
    if(hasLogin == true){
      console.log("logined");
      this.setData({
          userInfo:JSON.parse(wx.getStorageSync('userInfo')),
          hasLogin:wx.getStorageSync('hasLogin'),
          token:wx.getStorageSync("token")
      })
      var hasLogin = wx.getStorageSync('hasLogin');
      if(hasLogin == true){
        console.log("logined");
        this.setData({
            userInfo:JSON.parse(wx.getStorageSync('userInfo')),
            hasLogin:wx.getStorageSync('hasLogin'),
            token:wx.getStorageSync("token")
        })
        wx.request({
          url: 'http://localhost:8081/address/BaseOnUserid?',
          data:{
            userid:this.data.userInfo.userid
          },
          method: 'GET',
          header:{
            'content-type':'application/json'
          },
          success:function(res2){
            console.log(res2.data.data)
            if(res2.data.data == null){
              that.setData({
                hasAddress:false
              })
            }else{
              that.setData({
                addressList:res2.data.data,
                hasAddress:true
              })
            }
            console.log(that.data.addressList)
          }
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.refresh();
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