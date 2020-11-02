//app.js
// import { request } from '../../request.js'
import { api,request } from './utils/request'
const utils = require("./utils/utils.js")

Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
      "M+" : this.getMonth()+1,                 //月份
      "d+" : this.getDate(),                    //日
      "h+" : this.getHours(),                   //小时
      "m+" : this.getMinutes(),                 //分
      "s+" : this.getSeconds(),                 //秒
      "q+" : Math.floor((this.getMonth()+3)/3), //季度
      "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
      if(new RegExp("("+ k +")").test(fmt))
           fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

App({
  // onLaunch: function () {
  //   // 展示本地存储能力
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     }
  //   })
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },

  	onLaunch: function(options) {
    	console.log(options)
      
      // 设置转发
      wx.showShareMenu({
        withShareTicket: true,
        // menus: ['shareAppMessage', 'shareTimeline']
      })
		
		// 检查是否有效的登录态
		// this.checkLogin()

		// this.login()
	
  	},
  	onShow: function(options) {
      
    },
  	onHide: function() {},
  	onError: function(msg) {},
  	checkLogin:function(){
      // 检查是否已经登录
      var that=this
      console.log("aaa")
      wx.checkSession({
        success () {
          //session_key 未过期，并且在本生命周期一直有效
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
          // that.login() //重新登录
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
      })
  	},
  	login:function(){
		
  	},
    getUserInfo(){
      // 获取用户信息
      var that=this;
      return request({
        url:api.user.info,
        method:'get',
      }).then(function(res){
        var data=res.data.data
        data.nickname=data.nickname||wx.getStorageSync('userInfo').nickName
        data.avatar=data.avatar||wx.getStorageSync('userInfo').avatarUrl
        that.globalData.userInfo=data
      })
    },

  	globalData: {
      userInfo: null,
      tabbarList:[
        {icon:"wap-home-o",page:"../../pages/index/index",label:"首页"},
        {icon:"apps-o",page:"../../pages/classification/classification",label:"分类"},
        {icon:"cart-o",page:"../../pages/cart/cart",label:"购物车"},
        {icon:"user-o",page:"../../pages/mine/mine",label:"我的"},
      ],
      storeId:5,
  	}
})