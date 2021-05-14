// pages/goods_list/index.js
import { request } from "../../request/index.js";
/* 1.用户上滑页面,滚动条触底,开始加载下一页数据
      1.找到滚动条触底事件
      2.判断还有没有下一页数据
        1.获取到总页数  只有总条数
           总页数 = Math.ceil(总条数 / 页容量)
                  = Math.ceil(23 / 10 )
        2.获取到当前页码
        3.判断 当前页码是否大于总页数
      3.假如没有下一页数据,弹出提示框
      4.还有下一页数据 加载下一页数据
         1.当前的页码 ++ 
         2.重新发送请求 获取数据
         3.数据请求回来 要对data中的数据 进行 拼接,而不是替换！！！
    2.下拉刷新页面
       1.触发下拉刷新事件  需要在页面的 json 文件中开启一个配置项
       2.重置数据数组
       3.重置pagenum  为 1
       4.重新发送请求
       5.数据请求回来 需要手动的关闭 等待效果
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      }, {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goods_list: []
  },
  //接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  //总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },

  //获取商品列表数据
  async getGoodsList () {
    const res = await request({
      url: "goods/search",
      data: this.QueryParams
    })
    console.log(res);
    //获取 总条数
    const total = res.total;
    //计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    // console.log(this.totalPages);

    this.setData({
      goods_list: [...this.data.goods_list, ...res.goods]
    })
    //关闭下拉刷新的窗口  如果没有调用下拉刷新的窗口 直接关闭 也不会报错
    wx.stopPullDownRefresh()

  },



  //标题的点击事件 从子组件传递过来的
  handletabsItemChange (e) {
    console.log(e);
    //1.获取被点击的标题索引
    const { index } = e.detail;
    console.log(index);
    //2.修改原数组
    let tabs = this.data.tabs;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    //3.赋值到data中
    this.setData({
      tabs: tabs
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
    //1.重置数组
    this.setData({
      goods_list: []
    })
    // 2.重置页码
    this.QueryParams.pagenum = 1
    // 3.重新发送请求
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //1.判断还有没有下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      //没有下一页数据
      wx.showToast({
        title: '已经没有下一页了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });

      console.log();
    } else {
      //还有下一页
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})