// pages/myinfo/myinfo.js
const app = getApp();
import { apiUrl,api,request } from '../../utils/request'
const utils = require("../../utils/utils.js")

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:{},
		birthdaystr:"",
		sexstr:"",
		sexshowflag:false,
		sexOptions:["男","女"],
		dateshowflag:false,

		currentDate: new Date().getTime(),
		minDate: new Date("1900-1-1").getTime(),
		formatter(type, value) {
			if (type === 'year') {
				return `${value}年`;
			} else if (type === 'month') {
				return `${value}月`;
			}else if (type === 'day'){
				return `${value}日`;
			}
			return value;
		},
	},
	mybankcard(){
		wx.navigateTo({
			url: '../../pages/mybankcard/mybankcard',
		})
	},
	myposters(){
		wx.navigateTo({
			url: '../../pages/myposters/myposters',
		})
	},
	changenickname(){
		// 修改昵称
		var that=this;
		wx.navigateTo({
			url: '../../pages/changeNickName/changeNickName',
			events:{
				afterChangeName(){
					that.updateUserInfo()
				}
			}
		})
	},

	onCloseSex(){
		this.setData({
			sexshowflag:false
		})
	},
	showSex(){
		this.setData({
			sexshowflag:true
		})
	},
	sexConfirm(val){
		var sexNum=0
		if(val.detail.value=="男"){
			sexNum=1
		}
		// 修改信息
		var that=this;
		var data=this.data.userInfo
		data.sex=sexNum
		data.sign=utils.md5Data(data);
		request({
			url:api.user.update,
			method:'post',
			data:data
		}).then(function(res){
			console.log(res)
			that.updateUserInfo()
		})
		this.setData({
			sexshowflag:false
		})
	},
	showDate(){
		this.setData({
			dateshowflag:true
		})
	},
	onCloseDate(){
		this.setData({
			dateshowflag:false
		})
	},
	dateConfirm(val){
		console.log(val)
		var time=val.detail
		var that=this;
		var data=this.data.userInfo
		data.birthday=time/1000
		data.sign=utils.md5Data(data);
		request({
			url:api.user.update,
			method:'post',
			data:data
		}).then(function(res){
			console.log(res)
			that.updateUserInfo()
		})
		this.setData({
			dateshowflag:false
		})
	},
	formatsexstr(){
		var sex=""
		if(this.data.userInfo.sex==0){
			sex="女"
		}
		if(this.data.userInfo.sex==1){
			sex="男"
		}
		this.setData({
			sexstr:sex
		})
	},
	formatbirthdaystr(){
		this.setData({
			birthdaystr:new Date(this.data.userInfo.birthday*1000).Format("yyyy年MM月dd日")
		})
	},

	//添加上传图片
	changeAvatar(){
		var that = this;
		wx.showActionSheet({
			itemList: ['从相册中选择', '拍照'],
			itemColor: "#00000",
			success: function (res) {
			  	if (!res.cancel) {
					if (res.tapIndex == 0) {
						that.chooseWxImage('album')
					} else if (res.tapIndex == 1) {
						that.chooseWxImage('camera')
					}
			  	}
			}
		})
	},
	// 图片本地路径
	chooseWxImage: function (type) {
		var that = this;
		wx.chooseImage({
		  	sizeType: ['original', 'compressed'],
		  	sourceType: [type],
		  	success: function (res) {
				// console.log(res.tempFilePaths[0]);
				// that.upImgs(res.tempFilePaths[0], 0) //调用上传方法
				const tempFilePaths = res.tempFilePaths[0]
				let index = tempFilePaths.lastIndexOf(".");
				var type = tempFilePaths.substr(index + 1)
				that.upImgs(tempFilePaths,type)
		  	}
		}) 
	},
	//上传服务器
	upImgs: function (imgurl, type) {
		var that = this;
		utils.base64({
			url: imgurl,
			type: type
		}).then(function(res){
			wx.showLoading({
				title: '图片上传中...',
				mask: 'true'
			})
			let data = {
				base64: res,
				suffix: type,
				sign: utils.md5Data({ base64: res, suffix: type })
			  }
			request({
				url: api.other.upLoader,
				method: 'POST',
				data: data
			}).then(res => {
				console.log(res)
				if (res.data.code == 200) {
					wx.hideLoading()
					that.avatarConfirm(res.data.data)
				}
			})
		})
	},
	avatarConfirm(url){
		var that=this;
		var data=this.data.userInfo
		data.avatar=url
		data.sign=utils.md5Data(data);
		request({
			url:api.user.update,
			method:'post',
			data:data
		}).then(function(res){
			console.log(res)
			that.updateUserInfo()
		})
	},


	getUserData(){
		var that=this;
		if(app.globalData.userInfo){
			this.setData({
				userInfo:app.globalData.userInfo
			},function(){
				that.formatsexstr()
				that.formatbirthdaystr()
			})
		}else{
			app.getUserInfo().then(function(){
				that.setData({
					userInfo:app.globalData.userInfo
				},function(){
					that.formatsexstr()
					that.formatbirthdaystr()
				})
			})
		}
	},
	updateUserInfo(){
		var that=this;
		return app.getUserInfo().then(function(){
			that.setData({
				userInfo:app.globalData.userInfo
			},function(){
				that.formatsexstr()
				that.formatbirthdaystr()
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
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