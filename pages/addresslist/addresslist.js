// pages/addresslist/addresslist.js
const app = getApp();
import { api,request } from '../../utils/request'
const utils = require("../../utils/utils.js")
import areaList from '../../utils/area'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		addresslist:[],
	},
	getAddressList(){
		var that=this;
		var data={
			page:1,
			rows:9999,
		}
		data.sign=utils.md5Data(data)
		request({
			url:api.address.list,
			method:'post',
			data:data
		}).then(function(res){
			console.log(res)
			var data=res.data.data||[]
			data=data.map(function(o){
				o.areaStr=areaList.province_list[o.province]+areaList.city_list[o.city]+areaList.county_list[o.district]
				return o
			})
			that.setData({
				addresslist:data
			})			
		})
	},
	refreshPage(d){
		console.log(d)
		this.getAddressList()
	},
	setDefault(o){
		// 设置为默认地址
		var that=this;
		console.log(o)
		var data={
			id:o.currentTarget.dataset.item.id
		};
		data.sign=utils.md5Data(data);
		request({
			url:api.address.setdefault,
			method:'get',
			data:data
		}).then(function(res){
			console.log(res)
			if(res.data.code==200){
				that.refreshPage()
			}
		})
	},
	addAddress(){
		wx.navigateTo({
			url: '../../pages/editaddress/editaddress?type=add',
			events:{
				refreshPage:this.refreshPage
			}
		})
	},
	deleteAddress(o){
		var that=this;
		var id=o.currentTarget.dataset.item.id
		var data={
			id:id
		}
		data.sign=utils.md5Data(data);
		request({
			url:api.address.remove,
			method:'post',
			data:data
		}).then(function(res){
			console.log(res)
			that.refreshPage()
		})
	},
	editAddress(o){
		var id=o.currentTarget.dataset.item.id
		wx.navigateTo({
			url: '../../pages/editaddress/editaddress?type=edit&&id='+id,
			events:{
				refreshPage:this.refreshPage
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getAddressList()
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