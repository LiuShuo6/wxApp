// pages/login/index.js
import { getUserInfo } from "../../request/index.js";
Page({
  async handlegetUserInfo () {
    const userInfo = await getUserInfo()
    console.log(userInfo);
    wx.setStorageSync("userinfo", userInfo);

    this.setData({
      userinfo: userInfo,
      hasUserInfo: true
    })
    wx.navigateBack({
      delta: 1
    });



  },
  data: {
    userinfo: {}
  }
})