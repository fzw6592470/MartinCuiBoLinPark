//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('appId', 'wx7863609cc2a77013')
    var that = this
    
    wx.checkSession({
		  success: function(){
		    //session 未过期，并且在本生命周期一直有效
		  },
		  fail: function(){
		    //登录态过期
		    wx.login({
		    	success: function (res) {
		      	if (res.code) {
		      		//发起网络请求
		      		wx.request({
		      			url: 'http://10.1.3.122:18211/ws/bolinapplet/applet/wechat/getSession',
		      			data: {
		              code: res.code
		           	},
		           	method: "post",
		           	success: function(res){
		           			debugger;
		           			if(res.bizCode == 0){
		           				wx.setStorageSync("openid",res.bizDetail.openid);
		           			}
		           			wx.getUserInfo({
					            success: function (res) {
					            	console.log(res);
					              that.globalData.userInfo = res.userInfo
					            }
					          })
		           	},
		           	fail: function(res){
		           		debugger;
		           	},
		           	complete: function(e){
		           		debugger;
		           	}
		      		})
		      	} else {
		          console.log('获取用户登录态失败！' + res.errMsg)
		        }
		    	}
		  	});
		  }
		});
    
    let member_vaild_date = wx.getStorageSync("member_vaild_date");
		var loginVaildTime = "";
		if(member_vaild_date == null || member_vaild_date == undefined || member_vaild_date == ""){
			loginVaildTime = null;
		}else{
			let time = member_vaild_date.slice(0,4)+"-"+member_vaild_date.slice(4,6)+"-"+member_vaild_date.slice(6,8)+" "+member_vaild_date.slice(8,10)+":"+member_vaild_date.slice(10,12)+":"+member_vaild_date.slice(12,14);
			let login_vaild_time = new Date(time).getTime();
			console.log(login_vaild_time);
			let nowTime = new Date().getTime();
			console.log(nowTime);
			if(login_vaild_time-nowTime <= 0){
				loginVaildTime = null;
			}
		}
		
		if(loginVaildTime == null){
			wx.redirectTo({
				url:  "pages/member/login"
			});
		}
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
            	console.log(res);
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
  }
})