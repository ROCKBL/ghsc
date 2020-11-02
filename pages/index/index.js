// pages/index/index.js

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
		active: 0,
		tabbarList:app.globalData.tabbarList,
		// 搜索框
		searchValue:"",
		// 轮播图
		carouselList:[
			// {img:"../../images/index1.png",key:1},
			// {img:"../../images/index2.png",key:2},
			// {img:"../../images/index3.png",key:3}
		],
		// 商品分类
		cateList:[],
		// 计时器
		// time: 30 * 60 * 60 * 1000,
		time:null,
		timeData: {},
		// 限时抢购商品
		timeLimitAr:[],//时间数组
		timeLimitGoods:[],//商品数组
		// 今日推荐商品
		recommendGoods:[],
		pageIndex:1,//今日推荐第几页
		finished:false,//今日推荐是否加载完毕
	},
	// tabbar点击跳转页面
	onChange(event) {
		// event.detail 的值为当前选中项的索引
		var obj=this.data.tabbarList[event.detail]
		console.log(obj)
		wx.redirectTo({
			url: obj.page,
		})
	},
	// 搜索输入框双向绑定
	onSearchChange(e){
		this.setData({
			searchValue: e.detail,
		});
	},
	// 搜索
	onSearch(){
		console.log(this.data.searchValue)
	},
	onFocus(){
		wx.navigateTo({
		  url: '../../pages/search/search',
		})
	},
	// 点击分类
	clickCate(e){
		var data=e.currentTarget.dataset.item
		console.log(data)
	},
	// 计时器双向绑定
	onTimeChange(e){
		this.setData({
			timeData: e.detail,
		});
	},
	// 跳转签到页面
	goSignIn(){
		wx.navigateTo({
			url: '../../pages/signIn/signIn',
		})
	},

	// 获取数据
	getCarouselData(){
		var that=this;
		var data={
			status:1
		}
		let sign = utils.md5Data(data)
		data.sign=sign
		request({
			url:api.other.getcarousel,
			method:'get',
			data:data,
		}).then(function(res){
			// console.log(res)
			that.setData({
				carouselList:res.data.data
			})
		})
	},
	getCateData(){
		var that=this;
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
			that.setData({
				cateList:res.data.data
			})
		})
	},
	getTimeLimitData(){
		var that=this;
		var data1={
			storeId:this.data.storeId,
		}
		data1.sign=utils.md5Data(data1)
		request({
			url:api.goods.getUserLimitTime,
			method:'post',
			data:data1
		}).then(function(res){
			// 获取限时抢购时间数组
			that.setData({
				timeLimitAr:res.data.data
			})

			var date=(new Date()).getTime()
			console.log(date)
			var dateId=null
			res.data.data.map(function(o){
				if(o.start_time*1000<date&&o.end_time*1000>date){
					dateId=o.id
					that.setData({
						time:o.end_time*1000-date
					})
				}
			})
			if(dateId==null){
				return
			}

			// 获取归属于dateId的限时抢购商品列表
			var data2={
				limitId:dateId,
				storeId:that.data.storeId,
			}
			data2.sign=utils.md5Data(data2)
			request({
				url:api.goods.getUserLimitTimeGoods,
				method:'post',
				data:data2
			}).then(function(res){
				// console.log(res)
				that.setData({
					timeLimitGoods:res.data.data[dateId]
				})
			})

		})
	},
	getRecommendData(pageIndex){
		var that=this;
		var rows=10;
		var data={
			storeId:this.data.storeId,
			is_recommend:1,
			status:0,
			page:pageIndex||1,
			rows:rows
		}
		data.sign=utils.md5Data(data)
		request({
			url:api.goods.userFind,
			method:'get',
			data:data
		}).then(function(res){
			if(res.data.data.length<rows){
				that.setData({
					finished:true
				})
			}
			that.setData({
				recommendGoods:that.data.recommendGoods.concat(res.data.data)
			})
		})
	},
	loadMoreRecommendGoods(e){
		console.log(e)
		if(this.data.finished){
			return
		}
		
		var newPageIndex=this.data.pageIndex+1
		this.setData({
			pageIndex:newPageIndex
		})
		this.getRecommendData(newPageIndex)
	},
	initPage(){
		// 获取轮播图
		this.getCarouselData()
		// 获取商品分类
		this.getCateData()
		// 获取限时抢购时间列表
		this.getTimeLimitData()
		// 获取推荐商品
		this.getRecommendData()
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.initPage()

		
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