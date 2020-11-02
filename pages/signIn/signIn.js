// pages/signIn/signIn.js
const app = getApp();
import { api,request } from '../../utils/request'
const utils = require("../../utils/utils.js")

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:{
			nickname:"未登录",
			avatar:"",
			level_name:"普通会员",
			unlogin:true
		},
		signList:[
			{num:1,hasGift:false,label:"1天",name:1},
			{num:1,hasGift:false,label:"2天",name:2},
			{num:1,hasGift:false,label:"3天",name:3},
			{num:1,hasGift:true,label:"4天",name:4},
			{num:1,hasGift:false,label:"5天",name:5},
			{num:1,hasGift:false,label:"6天",name:6},
			{num:1,hasGift:true,label:"7天",name:7},
		],
		number:0,
	},
	// 获取用户数据
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
	// 获取签到列表
	getSevenMun(){
		var that=this;
		request({
			url:api.signIn.getSevenMun,
			method:'get',
		}).then(function(res){
			console.log(res)
			var dd=that.data.signList
			for(var i =0;i<dd.length;i++){
				dd[i].num=res.data.data[dd[i].name]
			}
			that.setData({
				signList:dd
			})
		})
	},
	// 获取用户签到数据
	getSignInData(){
		var that=this;
		request({
			url:api.signIn.seeUserSign,
			method:'get',
		}).then(function(res){
			// console.log(res)
			that.setData({
				number:res.data.data.number
			})
		})
	},
	userSign(){
		var that=this;
		var data={
			day:this.data.number
		}
		let sign = utils.md5Data(data)
		data.sign=sign
		request({
			url:api.signIn.userSign,
			method:'get',
			data:data,
		}).then(function(res){
			if(res.data.msg=="今天已经签到了"){
				console.log("aaaa")
				wx.showToast({
					title: '今天已经签到了',
					duration: 2000
				})
				return
			}
			// 刷新页面
			that.getSignInData()
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getUserData()

		this.getSevenMun()

		this.getSignInData()
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