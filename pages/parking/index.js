require("../../utils/util");
var app = getApp();

Page({
	data:{
		"title": "泊林停车",
		loginUrl: "../member/login"
	},
	onLoad: function(){
		
	},
	onShow: function(){
		app.getUserInfo(this.lookUserInfo);
	},
	outSideParking: function(e){
		var url = e.currentTarget.dataset.url+"?parkingType=0";
		wx.navigateTo({"url":url});
	},
	inSideParking: function(e){
		var url = e.currentTarget.dataset.url+"?parkingType=1&type=parking";
		wx.navigateTo({"url":url});
	},
	lookUserInfo: function(user_info){
		console.log(user_info);
		wx.setStorageSync("user_info",user_info)
	}
});