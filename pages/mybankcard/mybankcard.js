// pages/mybankcard/mybankcard.js
const app = getApp();
import { apiUrl,api,request } from '../../utils/request'
const utils = require("../../utils/utils.js")

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:{},
		bankCardInfo:{
			real_name:"",
			mobile:"",
			bank_name:"",
			card_number:"",
		},
		type:"add"
	},
	testPhone(phone){
		if(!(/^1[3456789]\d{9}$/.test(phone))){
			// this.Toast("请输入正确的手机号码")
			wx.showToast({
				title: '请输入正确的手机号码',
				icon: 'none',
				duration: 2000
			})
			return true; 
		} 
		return false;
	},
	testCardNo(cardNo){
		var reg = /^([1-9]{1})(\d{15}|\d{18})$/; 
		if(reg.test(cardNo) === false){
			// this.Toast("请输入正确的银行卡号")
			wx.showToast({
				title: '请输入正确的银行卡号',
				icon: 'none',
				duration: 2000
			})
			return true;
		}
		return false;
	},
	testName(){
		if(this.data.bankCardInfo.real_name==""){
			wx.showToast({
				title: '请输入真实姓名',
				icon: 'none',
				duration: 2000
			})
			return true;
		}
		return false;
	},
	testBankName(){
		if(this.data.bankCardInfo.bank_name==""){
			wx.showToast({
				title: '请输入所属银行',
				icon: 'none',
				duration: 2000
			})
			return true;
		}
		return false;
	},

	onChangeName(event){
		this.setData({
			"bankCardInfo.real_name":event.detail
		})
	},
	onChangeMobile(event){
		this.setData({
			"bankCardInfo.mobile":event.detail
		})
	},
	onChangeBankName(event){
		this.setData({
			"bankCardInfo.bank_name":event.detail
		})
	},
	onChangeCardNumber(event){
		this.setData({
			"bankCardInfo.card_number":event.detail
		})
	},

	submit(){
		console.log(this.data.bankCardInfo)

		if(this.testName()||this.testBankName()||this.testCardNo(this.data.bankCardInfo.card_number)||this.testPhone(this.data.bankCardInfo.mobile)){
			return
		}
		if(this.data.type=="add"){
			this.addBankCard()
		}else{
			this.changeBankCard()
		}
	},
	addBankCard(){
		var that=this;
		var data=this.data.bankCardInfo
		data.sign=utils.md5Data(data);
		request({
			url:api.bankcard.addBankCard,
			method:'post',
			data:data
		}).then(function(res){
			console.log(res)
			if(res.data.code==200){
				wx.navigateBack({
					delta:1
				})
			}
		})
	},
	changeBankCard(){
		var that=this;
		var data=this.data.bankCardInfo
		data.user_id=this.data.userInfo.id
		data.sign=utils.md5Data(data);
		request({
			url:api.bankcard.changeBankCard,
			method:'post',
			data:data
		}).then(function(res){
			console.log(res)
			if(res.data.code==200){
				wx.navigateBack({
					delta:1
				})
			}
		})
	},
	
	getBankCardInfo(){
		var that=this;
		request({
			url:api.bankcard.getBankCard,
			method:'get',
		}).then(function(res){
			console.log(res)
			if(res.data.code==200){
				if(res.data.data.length>0){
					that.setData({
						bankCardInfo:res.data.data[0],
						type:"edit"
					})
				}
			}
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
		this.getUserData()
		this.getBankCardInfo()
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