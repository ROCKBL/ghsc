// pages/cart/cart.js
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
		active: 2,
		tabbarList:app.globalData.tabbarList,
		goodsList:[]
	},
	onChange(event) {
		// event.detail 的值为当前选中项的索引
		var obj=this.data.tabbarList[event.detail]
		console.log(obj)
		wx.redirectTo({
		  	url: obj.page,
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 获取购物车数据
		request({
			url:api.cart.fetch,
			method:'get',
		}).then(function(res){
			console.log(res)
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