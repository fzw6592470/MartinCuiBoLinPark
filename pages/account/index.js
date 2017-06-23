var app = getApp();

Page({
	data:{
		"title": "个人中心",
		mobileNo: "",
		balance: 0.00,
		car_url: "../car/index",
		bill_url: "bill",
		record_url: "record",
		pwd_url: "../password/index",
		headImg: "",
		loginUrl: "../member/login"
	},
	onLoad: function(){
	},
	onShow:function(){
		app.getUserInfo(this.lookUserInfo);
		var mobileNo = wx.getStorageSync("member_mobile_no");
		mobileNo = mobileNo.slice(0,3) + "****" + mobileNo.slice(7);
		this.setData({
			balance: (Math.random()*100).toFixed(2),
			mobileNo: mobileNo
		});
	},
	turnUrl: function(e){
		let url = e.currentTarget.dataset.url;
		wx.navigateTo({url:url});
	},
	loginout: function(e){
		console.log("loginout.");
		wx.clearStorageSync();
		wx.redirectTo({
			url: '../member/login'
		})
	},
	lookUserInfo: function(userInfo){
		this.setData({
			headImg: userInfo.avatarUrl
		})
	}
});
