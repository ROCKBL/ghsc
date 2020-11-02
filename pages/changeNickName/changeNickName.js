// pages/changeNickName/changeNickName.js

const app = getApp();
import { apiUrl,api,request } from '../../utils/request'
const utils = require("../../utils/utils.js")

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		nickname:"",
		userInfo:{},
	},
	onChange(event){
		this.setData({
			nickname:event.detail
		})
	},
	changeConfirm(){
		if(this.data.nickname==""){
			wx.showToast({
				title: '请输入新的昵称',
				icon: 'none',
				duration: 2000
			})
			return
		}
		const eventChannel = this.getOpenerEventChannel()
		var that=this;
		var data=this.data.userInfo
		data.nickname=this.data.nickname
		data.sign=utils.md5Data(data);
		request({
			url:api.user.update,
			method:'post',
			data:data
		}).then(function(res){
			if(res.data.code==200){
				eventChannel.emit("afterChangeName")
				wx.navigateBack({
					delta:1
				})
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
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
	onLoad: function (options) {
		this.getUserData()
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