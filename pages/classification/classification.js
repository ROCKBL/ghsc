// pages/classification/classification.js
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
		active: 1,
		tabbarList:app.globalData.tabbarList,
		// 一级分类列表数据
		fatherClassificationList:[],
		// 二级分类列表数据
		childClassificationList:[],
	},
	onChange(event) {
		// event.detail 的值为当前选中项的索引
		var obj=this.data.tabbarList[event.detail]
		console.log(obj)
		wx.redirectTo({
			url: obj.page,
		})
	},
	getFatherClassificationListData(){
		// 获取一级分类列表数据
		var data={
			storeId:this.data.storeId,
			page: 1,
      		rows: 990,
		}
		data.sign=utils.md5Data(data)
		request({
			url:api.goods.getcate,
			method:'get',
			data:data
		}).then(function(res){
			console.log(res)
		})
	},
	getChildClassificationListData(){
		// 获取二级分类列表数据

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getFatherClassificationListData()
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