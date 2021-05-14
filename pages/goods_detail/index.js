// pages/goods_detail/index.js
import { request } from "../../request/index.js";
/* 1.发送请求获取信息 
   2.点击轮播图预览大图 
     1.给轮播图绑定点击事件
     2.调用小程序api previewImage
   3.点击加入购物车
     1.绑定点击事件
     2.获取缓存中的购物车数据 数组格式
     3.先判断当前商品是否已经存在于购物车
     4.已经存在  修改商品数据 执行购物车数量++ 重新把购物车数组填充会缓存中
     5.不存在于购物车数组中  直接给购物车数组添加新元素  带上 购买数量属性 num 重新把购物车数组填充会缓存中
     6.弹出用户提示
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {

    }
  },
  //商品对象
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options); goods_id: "43986"
    const { goods_id } = options
    this.getGoodsDetail(goods_id)

  },
  //获取商品的详情信息
  async getGoodsDetail (goods_id) {
    const res = await request({
      url: "goods/detail",
      data: { goods_id }
    })
    this.GoodsInfo = res
    this.setData({
      goodsObj: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        goods_introduce: res.goods_introduce,
        pics: res.pics
      }
    })
  },

  //点击轮播图放大预览
  handlePrevewImage (e) {
    // 1.先构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map((v, i) => v.pics_mid)
    //2.接收传递过来的图片 url
    console.log(e);
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  //点击加入购物车
  handleCartAdd () {
    //  1.获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart") || [];  //如果cart 为空  就new 一个数组
    //  2.判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      //3.第一次添加
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    } else {
      //4.已经存在购物车数据 执行 num++
      cart[index].num++;
    }
    // 5.把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    // 6.弹窗提示用户
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true,

    });



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