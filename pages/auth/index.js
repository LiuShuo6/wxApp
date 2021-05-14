// pages/auth/index.js
import { request, login } from "../../request/index.js";
Page({

  //获取用户信息
  async handleGetUserInfo (e) {
    console.log(e);
    //获取用户信息
    const { encryptedData, rawData, iv, signature } = e.detail
    // 2获取小程序登录成功后的 code 值
    // wx.login({
    //   timeout: 10000,
    //   success: (result) => {
    //     // console.log(result)
    //     const { code } = result
    //     console.log(code);
    //   },
    // });
    // wx.getUserInfo({
    //   withCredentials: 'false',
    //   lang: 'zh_CN',
    //   timeout: 10000,
    //   success: (result) => {


    //   },
    // });

    try {
      //获取登录信息
      const { code } = await login()
      console.log(code);
      const loginParams = { encryptedData, rawData, iv, signature, code }
      //3.发送请求 获取用户的 token 值
      const { token } = await request({
        URL: "/users/wxlogin",
        data: loginParams,
        method: "post"
      }).then(res => {
        console.log(token);
      })
      //4.把token存入缓存中 同时跳回 上一个页面
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }





  },

  /**
   * 页面的初始数据
   */
  data: {
    code: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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