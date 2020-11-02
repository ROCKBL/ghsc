// pages/login/login.js

import { request,api } from '../../utils/request.js'
const utils = require("../../utils/utils.js")

Page({

	/**
	 * 页面的初始数据
	 */
  	data: {
		phoneShow:true,
		phoneReady:false,
		userInfoShow:true,
		userInfoReady:false,
	  },
	  
	getPhoneNumber:function(e){
		console.log(e)
		var that=this;
		if(e.detail.errMsg=="getPhoneNumber:ok"){
			wx.setStorageSync("phone",{
				encryptedData:e.detail.encryptedData,
				iv:e.detail.iv
			})
			// wx.setStorageSync('phone_encryptedData', e.detail.encryptedData)
			// wx.setStorageSync('phone_iv', e.detail.iv)
			this.setData({
				phoneReady:true,
				phoneShow:false
			},function(){
				if(that.data.phoneReady&&that.data.userInfoReady){
					that.login()
				}
			})
		}
	},
	cancelPhone(){
		this.setData({
			phoneShow:false
		})
	},
	getUserInfo(e){
		console.log(e)
		var that=this
		if(e.detail.errMsg=="getUserInfo:ok"){
			this.setData({
				userInfoReady:true,
				userInfoShow:false
			},function(){
				if(that.data.phoneReady&&that.data.userInfoReady){
					that.login()
				}
			})
		}
	},
	cancelUserInfo(){
		this.setData({
			userInfoShow:false
		})
	},

	login(){
		// 保存用于登录的信息：code,encryptedData,iv,signature,rawData
		var that=this
    	wx.login({
      		success: res => {
				// 获取code
				console.log(res)
				wx.setStorageSync('code', res.code)
				wx.getUserInfo({
					success:function(res){
						// 获取用户信息
						console.log(res)
						wx.setStorageSync('userInfo', res.userInfo)
						wx.setStorageSync('userOther',{
							encryptedData:res.encryptedData,
							iv:res.iv,
							signature:res.signature,
							rawData:res.rawData.replace(/\s*/g, "")
						})

						// wx.setStorageSync('encryptedData', res.encryptedData)
						// wx.setStorageSync('iv', res.iv)
						// wx.setStorageSync('signature', res.signature)
						// wx.setStorageSync('rawData', res.rawData.replace(/\s*/g, ""))
						// 发请求登录
						that.loginRequest()
					},
					fail(e){
						console.log(e)
					}
				})
      		}
    	})
	},
	loginRequest(){
		var phone=wx.getStorageSync('phone')
		var userOther=wx.getStorageSync('userOther')
		var data={
			code: wx.getStorageSync('code'),
			encryptedData: userOther.encryptedData,
			encryptedDataMobile: phone.encryptedData,
			iv: userOther.iv,
			ivMobile: phone.iv,
			signature: userOther.signature,
			rawData: userOther.rawData,
			parentId:17//todo 推广人的ID或者店铺ID
		}
		let sign = utils.md5Data(data)
		data.sign=sign
		console.log(data)
		request({
			url: api.login.checkUser,
			data:data,
			method: 'POST'
		}).then(function(res){
			console.log(res);
			wx.setStorageSync('token', res.data.data)
			// wx.showToast({
			// 	title: '登录成功',
			// })

			// wx.navigateBack({
			// 	delta:1
			// })

			//登录成功跳转首页 
			wx.reLaunch({
				url: '../../pages/index/index'
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that=this;
		// // 本地是否已经存储用户手机号码
		// var phone=wx.getStorageSync('phone')
		// if(phone){
		// 	this.setData({
		// 		phoneShow:false,
		// 		phoneReady:true
		// 	})
		// }
		// 获取用户授权信息，据此判断用户是否已同意授权用户信息
		wx.getSetting({
			success:function(e){
				console.log(e)
				if(e.authSetting["scope.userInfo"]){
					that.setData({
						userInfoShow:false,
						userInfoReady:true
					},function(){
						// 如果已有手机号码，用户已授权用户信息直接登录
						// if(phone){
						// 	that.login()

						// }
					})
				}
			}
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