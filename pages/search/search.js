// pages/search/search.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		searchValue:"",
		history:[],//历史搜索记录
	},
	goback(){
		wx.navigateBack({
			delta:1
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
		var that=this;
		var ar=this.data.history
		var findIndex=ar.findIndex(function(str){
			return str==that.data.searchValue
		})
		if(findIndex==-1){
			ar.push(this.data.searchValue)
			this.setData({
				history:ar
			},function(){
				wx.setStorageSync('searchHistory', this.data.history)
			})
		}
		// 跳转搜索结果列表页
		this.goSearchList()
	},
	deleteHistory(){
		// 清空历史搜索记录
		this.setData({
			history:[]
		},function(){
			wx.setStorageSync('searchHistory', this.data.history)
		})
	},
	searchHistory(e){
		// 点击历史搜索标签搜索
		// console.log(e)
		var that=this;
		this.setData({
			searchValue:e.currentTarget.dataset.words
		},function(){
			// 跳转搜索结果列表页
			that.goSearchList()
		})
	},
	goSearchList(){
		// wx.navigateTo({
		//   url: 'url',
		// })
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			history:wx.getStorageSync('searchHistory')||[]
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