//Page Object
// 引入 用来发送请求的方法 一定把路径写完整
import { request } from "../../request/index.js";
Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航数组
    catesList: [],
    //楼层数据
    floorList: [],
  },
  //options(Object)
  onLoad: function (options) {
    //1.发送异步请求获取轮播图数据  优化的手段可以通过ES6 的promise 来解决
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     console.log(result);
    //     this.setData({
    //       swiperList: result.data.message
    //     })


    //   },
    // });

    this.getSwiperList()
    this.getCateList()
    this.getFloorList()

  },
  //获取轮播图数据
  getSwiperList () {
    request({
      url: 'home/swiperdata',

    }).then(result => {
      console.log(result);
      this.setData({
        swiperList: result
      })
    })
  },
  //获取导航数据
  getCateList () {
    request({
      url: 'catitems',
    }).then(result => {
      console.log(result);
      this.setData({
        catesList: result
      })
    })
  },
  //获取楼层数据
  getFloorList () {
    request({
      url: 'home/floordata',
    }).then(result => {
      console.log(result);
      this.setData({
        floorList: result
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});

