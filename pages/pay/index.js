
/* 页面加载的时候从缓存中获取购物车数据 渲染到页面中
    1.这些数据checked 属性必须 等于 true   
  2.微信支付
    1.哪些人 哪些账号 可以实现微信支付
      1.企业账号
      2.企业账号的小程序后台中 必须 给开发者 添加上白名单 
       1.一个app 同时绑定多个开发者
       2.这些开发者就可以公用这个appid 和它的开发权限
    2.支付按钮
      1.先判断缓存中有没有token
      2.没有 跳转到授权页面 进行获取token
      3.有token ......

*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //点击支付
  handleOrderPay () {
    //判断缓存中有没有 token
    const token = wx.getStorageSync("token");
    //判断
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',

      });

      return;
    }
    console.log('yijingcunzai token');

  },









  //设置购物车状态 同时计算全选 总价格 购买的数量
  setCart (cart) {

    let allchecked = true;
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allchecked = false
      }
    })
    allchecked = cart.length ? cart.every(v => v.checked) : false;
    this.setData({
      cart,
      totalNum, totalPrice, allchecked
    })

    wx.setStorageSync("cart", cart);
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
    // 1.获取缓存 中的地址信息
    const address = wx.getStorageSync("address");
    //  1.获取缓存中的购物车数组
    const cart = wx.getStorageSync("cart") || [];
    //过滤后的购物车数组
    let checkedCart = cart.filter(v => v.checked == true)
    console.log(checkedCart);
    // 1计算全选
    // every 数组方法 会遍历  接收回调函数  那么 每一个回调函数都返回true 那么every方法的返回值为true
    // 只要里面有一个回调函数返回了false 那么不在执行循环，直接返回false
    //空数组 调用 every 返回值就是true
    const allchecked = cart.length ? cart.every(v => v.checked) : false;
    //总价格 总数量
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    }

    );


    // 2.给data赋值
    this.setData({
      address: address,
      cart: checkedCart,
      totalPrice: totalPrice,
      totalNum: totalNum,
      allchecked: allchecked
    })

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