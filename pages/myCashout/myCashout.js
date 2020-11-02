// pages/myCashout/myCashout.js

const app = getApp();
import { apiUrl,api,request } from '../../utils/request'
const utils = require("../../utils/utils.js")

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:{},
		cashoutMoney:null,
		bankCardInfo:{}
	},
	submit(){
		console.log(this.data.bankCardInfo)
		if(!this.data.bankCardInfo.hasOwnProperty("id")){
			wx.showToast({
			  title: '请先完善银行卡信息',
			  icon:"none",
			  duration:2000
			})
			return
		}
		

	},
	onInput(o){
		// console.log(o)
		this.setData({
			cashoutMoney:o.detail.value
		})
	},
	cashoutall(){
		this.setData({
			cashoutMoney:this.data.userInfo.active_money
		})
	},
	getUserData(){
		var that=this;
		app.getUserInfo().then(function(){
			that.setData({
				userInfo:app.globalData.userInfo
			})
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
					})
				}
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getUserData()
		// this.getBankCardInfo()
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