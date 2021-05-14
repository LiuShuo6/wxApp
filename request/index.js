//同时发送异步代码的次数
let ajaxTimes = 0;
export const request = function (parmas) {
  ajaxTimes++;
  //显示加载中效果
  wx.showLoading({
    title: '加载中',
    mask: true
  })

  //定义公共Url  
  //url:https://api-hmugo-web.itheima.net/api/public/v1/
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1/'
  return new Promise((reslove, reject) => {
    wx.request({
      ...parmas,  //这里指定是url
      url: baseUrl + parmas.url,
      success: function (reslut) {
        reslove(reslut.data.message)
      },
      fail: function (err) {
        reject(err)
      },
      complete: () => {
        ajaxTimes--
        if (ajaxTimes === 0) {
          //关闭正在等待图标
          wx.hideLoading()
        }
      }
    });

  })

}




export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result)
        // console.log(code);
      },
      fail: (err) => {
        reject(err)
      }

    });
  })
}

export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        resolve(res.userInfo)

      }
    })
  })
}