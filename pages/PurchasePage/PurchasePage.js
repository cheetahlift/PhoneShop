// pages/PurchasePage/PurchasePage.js

import Toast from '@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      cacheList:"",
      stepNow:1,
      showList:"",
      addressList:"",
      userInfo:"",
      addressChoose:"",
      orderForm:"",
      orderid:"",
      orderdetailForm:{
        orderid:'',
        goodid:'',
        nums:'',
        status:''
      },
      percent:0
  },
  onChange:function(event){
      this.setData({
        addressChoose:event.detail
      })
      console.log(this.data.addressChoose);
  },
  goNext1:function(){
      this.setData({
        userInfo:JSON.parse(wx.getStorageSync('userInfo'))
      });
      const that = this;
      wx.request({
        url: 'http://localhost:8081/address/BaseOnUserid?userid='+that.data.userInfo.userid,
        method:'GET',
        header:{
          'content-type':'application/json'
        },
        success:function(res){
          that.setData({
            addressList:res.data.data
          })
        }
      })
      that.setData({
        stepNow:2,
        percent:33
      })
  },
  goNext2:function(){
    const that = this;
    let localdate = new Date();
    // console.log(mysqldate);
    let year = localdate.getFullYear();
    let month = localdate.getMonth()+1<10?"0"+(localdate.getMonth()+1):localdate.getMonth()+1;
    let day = localdate.getDate()<10?"0"+localdate.getDate():localdate.getDate();
    let hours = localdate.getHours()<10?"0"+localdate.getHours():localdate.getHours();
    let minutes = localdate.getMinutes()<10?"0"+localdate.getMinutes():localdate.getMinutes();
    let seconds = localdate.getSeconds()<10?"0"+localdate.getSeconds():localdate.getSeconds();
    let mysqldate = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    console.log(mysqldate);
    if(this.data.addressChoose==""){
      console.log("go choose address")
      Toast.fail('没有选择收货地址！');
    }else{
      var totalprice = 0;
      for(var i = 0;i<this.data.showList.length;i++){
        totalprice+=(this.data.showList[i].nums*this.data.showList[i].goodprice);
      }
      console.log(totalprice);
      var userid = this.data.userInfo.userid;
      var status = '等待支付';
      var addressid = this.data.addressChoose;
      var dateCreate = mysqldate;
      this.setData({
        orderForm:{
          userid:userid,
          status:status,
          addressid:addressid,
          dateCreate:dateCreate,
          totalprice:totalprice
        }
      })
      wx.request({
        url: 'http://localhost:8081/orders/addOrder',
        data:that.data.orderForm,
        method:'PUT',
        header:{
          'content-type':'application/json'
        },
        success:function(res){
          console.log(res);
          that.setData({
            stepNow:3,
            orderid:res.data.data,
            percent:67
          });
          for(var i = 0;i<that.data.showList.length;i++){
            var torderdetail = {
              orderid:that.data.orderid,
              goodid:that.data.showList[i].goodid,
              nums:that.data.showList[i].nums,
              status:'等待支付'
            };
            wx.request({
              url: 'http://localhost:8081/orderdetail/addOrderdetail',
              data:torderdetail,
              method:'PUT',
              header:{
                'content-type':'application/json'
              },
              success:function(res){
                console.log(res);
              }
            })
            
          }

          
        }
      })
    }
  },
  goNext3:function(){
    let localdate = new Date();
    const that = this;
    // console.log(mysqldate);
    let year = localdate.getFullYear();
    let month = localdate.getMonth()+1<10?"0"+(localdate.getMonth()+1):localdate.getMonth()+1;
    let day = localdate.getDate()<10?"0"+localdate.getDate():localdate.getDate();
    let hours = localdate.getHours()<10?"0"+localdate.getHours():localdate.getHours();
    let minutes = localdate.getMinutes()<10?"0"+localdate.getMinutes():localdate.getMinutes();
    let seconds = localdate.getSeconds()<10?"0"+localdate.getSeconds():localdate.getSeconds();
    let mysqldate = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    console.log(mysqldate);
    var tOrderForm ={
          orderid:this.data.orderid,
          userid:this.data.orderForm.userid,
          status:'等待卖家发货',
          addressid:this.data.orderForm.addressid,
          dateCreate:this.data.orderForm.dateCreate,
          totalprice:this.data.orderForm.totalprice,
          datePaid:mysqldate
    };
    this.setData({
      orderForm:tOrderForm
    });
    wx.request({
      url: 'http://localhost:8081/orders/addOrder',
      data:that.data.orderForm,
      method:'PUT',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res);
        that.setData({
          stepNow:4,
          percent:100
        })
          wx.request({
            url: 'http://localhost:8081/orderdetail/changeStatusByOrderid',
            data:{
              orderid:that.data.orderid,
              status:'等待卖家发货'
            },
            method:'GET',
            header:{
              'content-type':'application/json'
            },
            success:function(res2){

            }
          })
      }

    })





    
  },

  goNext4:function(){
    wx.redirectTo({
      url: '/pages/OrderPage/OrderPage'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        cacheList:JSON.parse(wx.getStorageSync(options.cacheListid))
      })
      console.log(JSON.parse(wx.getStorageSync(options.cacheListid)))
      console.log(this.data.cacheList)
      const that = this;
      wx.request({
        url: 'http://localhost:8081/goods/baseOnSth',
        data:that.data.cacheList,
        method:'PUT',
        header:{
          'content-type':'application/json'
        },
        success:function(res){
          that.setData({
            showList:res.data.data
          })
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