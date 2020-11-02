// pages/editaddress/editaddress.js

const app = getApp();
import { api,request } from '../../utils/request'
const utils = require("../../utils/utils.js")
// const areaList = require("../../utils/area.js")
import areaList from '../../utils/area'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		addressInfo:{
			address:null,
			city:null,
			district:null,
			mobile:null,
			name:null,
			province:null,
			// status:
		},
		areastr:null,
		areaList:areaList,
		type:"add",
		id:null,
		show:false,
	},

	onChangeName(event){
		this.setData({
			"addressInfo.name":event.detail
		})
	},
	onChangeMobile(event){
		this.setData({
			"addressInfo.mobile":event.detail
		})
	},
	onChangeAddress(event){
		this.setData({
			"addressInfo.address":event.detail
		})
	},
	formatAddress(){
		if(this.data.addressInfo.province){
			return areaList.province_list[this.data.addressInfo.province]+areaList.city_list[this.data.addressInfo.city]+areaList.county_list[this.data.addressInfo.district]
		}else{
			return ""
		}
	},
	showPopup() {		
		this.setData({ show: true });
	},
	onClose() {
		this.setData({ show: false });
	},
	addressConfirm(o){	
		var that=this
		var ar=o.detail.values
		this.setData({
			"addressInfo.province":Number(ar[0].code),
			"addressInfo.city":Number(ar[1].code),
			"addressInfo.district":Number(ar[2].code),
			show:false,
		},function(){
			that.setData({
				areastr:that.formatAddress()
			})
		})
		
	},
	getAddress(id){
		// 根据ID获取收货地址
		var that=this;
		var data={
			addressId:id
		};
		data.sign=utils.md5Data(data)
		request({
			url:api.address.getone,
			method:'get',
			data:data
		}).then(function(res){
			console.log(res)
			var data=res.data.data
			that.setData({
				addressInfo:data
			},function(){
				that.setData({
					areastr:that.formatAddress()
				})
			})
		})
	},
	submit(){
		if(this.data.type=="add"){
			this.addAddress()
		}else{
			this.updateAddress()
		}
	},
	addAddress(){
		// 添加地址
		if(!this.data.addressInfo.name||!this.data.addressInfo.address||!this.data.addressInfo.mobile||!this.data.addressInfo.province){
			wx.showToast({
				title: '请完善信息',
				icon: 'none',
				duration: 2000
			  })
			return
		}
		var that=this;
		var data=this.data.addressInfo;
		data.sign=utils.md5Data(data);
		request({
			url:api.address.add,
			method:'post',
			data:data
		}).then(function(res){
			console.log(res)
			// var data=res.data.data
			if(res.data.code==200){
				const eventChannel = that.getOpenerEventChannel()
				eventChannel.emit('refreshPage', {data: 'test'});

				wx.navigateBack({
					delta:1
				})
			}else{
				wx.showToast({
					title: '请检查输入的内容',
					icon: 'none',
					duration: 2000
				})
			}
		})
	},
	updateAddress(){
		// 更新地址
		var that=this;
		var data=this.data.addressInfo;
		delete data.sign
		data.sign=utils.md5Data(data);
		
		request({
			url:api.address.update,
			method:'post',
			data:data
		}).then(function(res){
			if(res.data.code==200){
				const eventChannel = that.getOpenerEventChannel()
				eventChannel.emit('refreshPage', {data: 'test'});
				wx.navigateBack({
					delta:1
				})
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options)
		this.setData({
			type:options.type
		})
		if(options.type=="edit"){
			this.setData({
				id:options.id
			})
			this.getAddress(options.id)
		}
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