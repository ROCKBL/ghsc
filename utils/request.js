// const apiUrl = "https://api.yijiamaicai.com:8989/api/"; //服务器api地址
const apiUrl = "http://172.16.16.210:8080/api/"; //服务器api地址

var flag=0;

var request=function(params){
	flag+=1
	if(flag==1){
		// wx.showLoading({ title: '加载中', mask: true,icon:"none",duration:3000 })
		wx.showLoading({ title: '加载中', mask: true })
	}
	var token = wx.getStorageSync('token').token;

  	return new Promise(function(resolve,reject){
		wx.request({
			url: apiUrl + params.url,
			data: params.data,
			header: params.header || {
				"Content-Type": "application/x-www-form-urlencoded",
				"authorization": token || '111' 
			},
			method: params.method || 'POST',
			success:function(res){
				// console.log(res)
				if(res.data.code==1002){
					// "无效的token"  需要token，跳转登录页
					wx.navigateTo({
					  url: '../login/login',
					})
					return
				}
				resolve(res)
			},
			fail(e){
				console.log(e)
				reject(e)
			},
			complete(){
				flag-=1
				if(flag==0){
					wx.hideLoading()
				}
			}
		})
  	})

}

var api={
	// 登录权限相关
	login:{
		checkUser:"user/wx/checkUser",//获取token
	},
	// 商品相关
	goods:{
		getcate:"user/cate/get",//获取商品分类
		// 限时抢购
		getUserLimitTime:"user/goods/getUserLimitTime",//获取限时抢购时间
		getUserLimitTimeGoods:"user/goods/getUserLimitTimeGoods",//获取限时抢购商品
		userFind:"user/goods/userFind",//获取今日推荐商品
	},
	// 购物车
	cart:{
		fetch:"user/cart/fetch",//获取购物车信息
		in_cart:"user/cart/in_cart",//添加商品到购物车
		remove:"user/cart/remove",//移除购物车
	},
	// 用户相关
	user:{
		info:"user/findById",//用户信息
		update:"user/update"//修改信息
	},
	// 用户签到
	signIn:{
		userSign:"user/sign/userSign",//签到
		seeUserSign:"user/sign/seeUserSign",//查看用户签到天数
		getSevenMun:"user/sign/getSevenMun"//签到获取积分列表
	},
	// 用户提现
	cashout:{
		list:"user/userWithdraw/userFindBy",//查看提现申请
		getMoney:"user/userGetMoney"//提交提现申请
	},
	// 收货地址
	address:{
		list:"user/address/find",//查询用户配送地址
		remove:"user/address/delete",//删除地址
		add:"user/address/add",//添加地址
		update:"user/address/update",//修改地址
		getone:"user/address/getUserAddress",//获取单个用户地址
		setdefault:"user/address/addressStatus",//修改默认地址
	},
	// 银行卡
	bankcard:{
		getBankCard:"user/bankCard/getAll",//获取银行卡列表
		addBankCard:"user/bankCard/insert",//添加银行卡
		changeBankCard:"user/bankCard/update",//修改银行卡
	},
	// 其他
	other:{
		getcarousel:"user/carousel/get",//获取轮播图
		upLoader:"user/upload/upload"//图片上传
	}
}

module.exports = {
	request: request,
	api:api,
	apiUrl:apiUrl
}