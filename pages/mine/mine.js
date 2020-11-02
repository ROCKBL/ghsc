// pages/mine/mine.js
const app = getApp();
import { api,request } from '../../utils/request'
const utils = require("../../utils/utils.js")

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		storeId:app.globalData.storeId,
		// 底部tabbar数据
		active: 3,
		tabbarList:app.globalData.tabbarList,
		// 用户中心数据
		money:0,
		footPrint:0,
		couponNum:0,
		userInfo:{
			nickname:"未登录",
			avatar:"",
			level_name:"普通会员",
			active_money:0,
			unlogin:true
		},

		// 订单中心
		orderCenter:[
			{name:"待付款",icon:"icon-icon",url:""},
			{name:"待发货",icon:"icon-daifahuo",url:""},
			{name:"待收货",icon:"icon-daishouhuo",url:""},
			{name:"待评价",icon:"icon-pingjia",url:""},
		],
		// 常用工具
		toolsList:[
			{name:"收货地址",icon:"icon-dizhi1",url:"../../pages/addresslist/addresslist"},
			{name:"我的等级",icon:"icon-huiyuanguanli",url:"../../pages/mylevel/mylevel"},
			{name:"我的团队",icon:"icon-tuandui",url:""},
			{name:"我的提现",icon:"icon-tixian",url:"../../pages/myBalance/myBalance"},
			{name:"我的积分",icon:"icon-jifen1",url:"../../pages/mypoints/mypoints"},
			{name:"我要送礼",icon:"icon-liwuhuodong",url:""},
			{name:"我的店铺",icon:"icon-wodeziliao",url:""},
			{name:"我的海报",icon:"icon-tuiguang",url:"../../pages/myposters/myposters"},
		],
		// 更多服务
		serviceList:[
			{title:"我的团购",icon:"icon-pintuangou",value:"",url:"",},
			{title:"平台资讯",icon:"icon-airudiantubiaohuizhi-zhuanqu_zixundongtai",value:"教你玩转商城",url:"",},
			{title:"成为供应商",icon:"icon-supplier",value:"",url:"",},
			{title:"拼团接龙",icon:"icon-gengduopintuan",value:"",url:"",},
			{title:"我的学院",icon:"icon-xueshimaoxuexibiye",value:"教你玩转商城",url:"",},
			{title:"线下活动",icon:"icon-huodong",value:"",url:"",},
			{title:"我的佣金",icon:"icon-huaban27",value:"",url:"",},
			// {title:"我的推广记录",icon:"icon-web-icon-",value:"",url:"",},
			{title:"建议与投诉",icon:"icon-bj-jy",value:"",url:"",},
		]
	},
	seeuserinfo(){
		wx.navigateTo({
			url: '../../pages/myinfo/myinfo',
		})
	},
	onChange(event) {
		// event.detail 的值为当前选中项的索引
		var obj=this.data.tabbarList[event.detail]
		console.log(obj)
		wx.redirectTo({
			url: obj.page,
		})
	},
	gopage(o){
		var data=o.target.dataset.item
		console.log(o)
		wx.navigateTo({
			// url: '../../pages/myposters/myposters',
			url:data.url
		})
	},
	getUserData(){
		var that=this;
		if(app.globalData.userInfo){
			this.setData({
				userInfo:app.globalData.userInfo
			})
		}else{
			app.getUserInfo().then(function(){
				that.setData({
					userInfo:app.globalData.userInfo
				})
			})
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// this.setData({
		// 	userInfo:wx.getStorageSync('userInfo')||{nickName:"未登录",avatarUrl:"",unlogin:true}
		// })
		// var token=wx.getStorageSync('token')
		// if(!token){
		// 	wx.navigateTo({
		// 	  url: '../../pages/login/login',
		// 	})
		// }

		this.getUserData()
		// var that=this;
		// request({
		// 	url:api.user.info,
		// 	method:'get',
		// }).then(function(res){
		// 	console.log(res)
		// 	var data=res.data.data
		// 	data.nickname=data.nickname||wx.getStorageSync('userInfo').nickName
		// 	data.avatar=data.avatar||wx.getStorageSync('userInfo').avatarUrl
		// 	that.setData({
		// 		userInfo:data
		// 	})
			
		// })

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