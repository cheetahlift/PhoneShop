// pages/TagPage/TagPage.js
Page({
  data: {
    goodList:[],
    currentTab: 0,  //对应样式变化
    scrollTop: 0,  //用作跳转后右侧视图回到顶部
    screenArray: [
      {
        screenId:0,
        screenName:'华为'
      },
      {
        screenId: 1,
        screenName: '一加'
      },
      {
        screenId: 2,
        screenName: '小米'
      },
      {
        screenId: 3,
        screenName: '苹果'
      },
      {
        screenId: 4,
        screenName: '三星'
      }
    ], //左侧导航栏内容
    screenId: 0,  //后台查询需要的字段
    screenType:'华为',
    childrenArray: {
      showImageUrl: 'http://img3.imgtn.bdimg.com/it/u=1798233457,4143585420&fm=26&gp=0.jpg',
      childrenScreenArray: [
        {
          screenName: '休闲零食',
          childrenScreenArray: [
            {
              screenId: 1,
              showImageUrl: 'http://img0.imgtn.bdimg.com/it/u=921197123,1741426939&fm=26&gp=0.jpg',
              screenName: '糖果'
            },
            {
              screenId: 2,
              showImageUrl: 'http://img3.imgtn.bdimg.com/it/u=46574630,3801160495&fm=26&gp=0.jpg',
              screenName: '新疆核桃'
            },
            {
              screenId: 2,
              showImageUrl: 'http://img3.imgtn.bdimg.com/it/u=46574630,3801160495&fm=26&gp=0.jpg',
              screenName: '新疆核桃'
            },
            {
              screenId: 2,
              showImageUrl: 'http://img3.imgtn.bdimg.com/it/u=46574630,3801160495&fm=26&gp=0.jpg',
              screenName: '新疆核桃'
            },
          ]
        },
        {
          screenName: '手机数码',
          childrenScreenArray: [
            {
              screenId: 1,
              showImageUrl: 'http://img0.imgtn.bdimg.com/it/u=1138662413,2627006305&fm=26&gp=0.jpg',
              screenName: 'vivo手机'
            },
            {
              screenId: 1,
              showImageUrl: 'http://img0.imgtn.bdimg.com/it/u=1138662413,2627006305&fm=26&gp=0.jpg',
              screenName: 'vivo手机'
            },
          ]
        },
      ]
    }, //右侧内容
  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8081/goods/all',
      method: 'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res.data.data)
        that.setData({
          goodList:res.data.data
        })
      }
    })
    
  },
  goSeeDetail:function(e){
   
   var goodid = e.currentTarget.dataset.id;
   console.log(goodid);
   wx.navigateTo({
     url: '/pages/GoodInfoPage/GoodInfoPage?goodid='+goodid,
   })
  },
  navbarTap: function (e) {
    console.log(e);
    var that = this;
    this.setData({
      currentTab: e.currentTarget.id,   //按钮CSS变化
      screenId: e.currentTarget.dataset.screenid,
      scrollTop: 0,   //切换导航后，控制右侧滚动视图回到顶部
    })
    //刷新右侧内容的数据
    var screenId = this.data.screenId;
    var newScreen = this.data.screenArray[screenId].screenName;
    this.setData({
      screenType:newScreen
    })

  },
})
