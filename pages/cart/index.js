// pages/cart/index.js
/*
1.获取用户的收获地址功能
  1.绑定点击事件
  2.调用小程序内置api 获取用户收货地址  wx.chooseAddress 
2.页面加载完毕
  1.获取本地存储中的地址数据
  2.把数据 设置给data中的一个变量
3.页面onShow
  0.回到商品详情页面 第一次添加商品的时候 手动的添加属性 控制checked是否选中
  1.获取缓存中的购物车数组
  2.把购物车数据填充到data中 
4.全选的实现 数据的展示
  1.onShow 获取到缓存中购物车数组
  2.根据 购物车中的商品数据 所有的商品都被选中 checked =true 全选就被选中
5.总价格和总数量
  1.都需要商品被选中 才拿它来计算
  2.获取购物车数组
  3.遍历
  4.判断商品是否被选中
  5.总价格 +=商品的单价 * 商品的数量
  5.总数量 += 商品的数量
  6.把计算后的价格和数量 设置回 data 中即可
6.商品的选中功能
   1.绑定change事件
   2.获取到被修改的商品对象
   3.把商品对象的状态 取反
   4.重新填充回data中和缓存中
   5.重新计算全选，总价格，总数量
7.商品数量编辑
  1."+" “-” 绑定同一个点击事件 区分的关键在于自定义属性
    1."+" +1  "-" -1
    2.传递被点击的商品id goods_id
    3.获取到data中的购物车数组 通过id 获取被修改的商品对象
    4.当购物车的数量 等于 1 同时 用户点击 - 
       1.弹窗提示,询问用户是否删除
         1.确定--直接删除
         2.取消--取消操作
    4.直接修改商品数量的num 属性
    5.把购物车数组 重新设置回缓存中和data中
  8.点击结算
    1.判断有没有收货地址信息
    2.判断用户是否选中商品
    3.经过验证 跳转到支付页面
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allchecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取收货地址
  handleChooseAddress () {
    // 2.获取收获地址
    wx.chooseAddress({
      success: (result) => {
        console.log(result);
        result.all = result.provinceName + result.cityName + result.countyName + result.detailInfo
        wx.setStorageSync("address", result);
      },

    });



  },
  //商品的选中 
  handleItemChange (e) {
    console.log(e);
    //1.获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id
    //  2.获取购物车数组
    let cart = this.data.cart
    // 3.找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id)
    //4.选中状态取反
    cart[index].checked = !cart[index].checked
    // 5 6 把购物车数据重新设置回data中 和缓存中
    this.setData({
      cart: cart
    });
    wx.setStorageSync("cart", cart);
    //重新计算全选，总价格，总数量
    let totalPrice = 0;
    let totalNum = 0;

    cart = wx.getStorageSync("cart");
    console.log(cart);
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num;
      }
    })
    this.data.allchecked = cart.every(v => v.checked)
    console.log(this.data.allchecked);
    this.setData({
      cart,
      totalNum,
      totalPrice,
      allchecked: this.data.allchecked
    })



  },
  //全选按钮点击
  handleAllCheckedChange (e) {
    console.log(e);
    //1.先获取购物车数组
    let cart = this.data.cart;
    let allchecked = this.data.allchecked
    console.log(cart);
    console.log(allchecked);
    //遍历数组,改变数组中元素的checked属性
    //拿到全局的allchecked  
    allchecked = !allchecked;
    cart.forEach(v => {
      console.log(v);
      v.checked = allchecked
    })
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num;
      }
    })

    this.setData({
      cart: cart,
      allchecked: allchecked,
      totalPrice,
      totalNum
    })

  },
  // 加减号点击
  handleNumEdit (e) {
    console.log(e);
    //  获取被点击的id
    const id = e.currentTarget.dataset.id
    console.log(id);
    //获取自定义属性 判断 + 或者-
    let operation = e.currentTarget.dataset.operation
    console.log(operation);
    // 在获取缓存的购物车数组
    let cart = this.data.cart
    console.log(cart);
    //循环这个数组,通过被点击的id来找到对应的商品对象
    let index = cart.findIndex(v => v.goods_id === id)
    console.log(index);
    this.data.allchecked = cart.length ? cart.every(v => v.checked) : false;

    // cart = wx.getStorageSync("cart");
    let totalPrice = 0
    let totalNum = 0
    //判断是否要执行删除
    if (cart[index].num == 1 && operation == -1) {
      //4.1弹窗提示
      wx.showModal({
        title: '提示',
        content: '您是否要删除',
        success: res => {
          if (res.confirm) {
            cart.splice(index, 1)
            // this.setCart(cart)
            this.setCart(cart)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    } else {
      cart[index].num += operation
    }
    //进行修改数量

    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    })
    this.setData({
      cart: cart,
      totalPrice: totalPrice,
      totalNum: totalNum,
      allchecked: this.data.allchecked
    })
    wx.setStorageSync("cart", cart);


  },


  //点击结算
  handlePay () {
    // 1.判断收货地址
    const address = this.data.address
    const totalNum = this.data.totalNum
    console.log(address);
    if (!address.userName) {
      //弹窗提示  
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true,
      });
      return;
    }
    //2.判断用户是否选中商品
    if (totalNum === 0) {
      //弹窗提示  
      wx.showToast({
        title: '您还没有选择商品',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: true,
      });
      return;
    }
    //3.跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    });

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
      cart: cart,
      allchecked: allchecked,
      totalPrice: totalPrice,
      totalNum: totalNum
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