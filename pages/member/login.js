var app = getApp();

let login = {
	  data: {
	    	userName: "",
	    	allow: true,
	    	vloginUrl: "vlogin",
	    	registerUrl: "register",
	    	password: ""
	  },
	  inputUserName: function(e){
	  		let userName = e.detail.value;
	  		if(!/^1[3,5,7,8]{1}[0-9]{9}$/g.test(userName)){
	  				this.showToast("请输入正确的手机号码");
	  				return false;
	  		}
	  		let password = this.data.password;
	  		if(password.length >= 8 || /[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*/.test(password)){
	  				this.setData({
					  		allow: false
			  		})
	  		}
	  		this.setData({
	  				userName: userName,
	  		})
	  },
	  inputPassword: function(e){
	  		let password = e.detail.value;
	  		if(password.length < 8 || !/[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*/.test(password)){
	  				this.showToast("请输入8位以上的数字与字母的组合");
	  				
	  				return false;
	  		}
	  		let userName = this.data.userName;
	  		if(/^1[3,5,7,8]{1}[0-9]{9}$/g.test(userName)){
	  				this.setData({
				  		allow: false
		  		})
	  		}
	  		this.setData({
	  				password: password
	  		})
	  },
	  login: function(e){
	  		var _that = this;
	  		console.log(e.detail.value);
	  		let data = e.detail.value;
	  		
	  		wx.request({
	  				url: 'http://10.1.3.122:18211/ws/bolinapplet/applet/mem/login',
	  				data: data,
	  				method: "post",
			      success: function(res) {
			      		var rep = res.data;
			      		if(rep.bizCode == 0){
			      			_that.showToast(rep.bizResult);
			      			let data = rep.bizDetail;
			      		
									//设置storage
									wx.setStorageSync("member_vaild_date",data.validDate);
									wx.setStorageSync("member_mobile_no",data.tel);
									wx.setStorageSync("member_pay_password_set",data.payPasswordSet);
									wx.setStorageSync("member_customer_id",data.id);
									if(!wx.getStorageSync("member_pay_password_set")){
											wx.redirectTo({
													url: "setPayPwd"
											})
									}
			      		}else{
			      			_that.showToast(rep.bizResult);
			      		}
			      }  
	  		});
	  		
	  },
	  goVaildLogin:function(e){
	  		wx.navigateTo({
	  			url: this.data.vloginUrl
	  		})
	  },
	  goRegister: function(e){
	  		wx.navigateTo({
	  			url: this.data.registerUrl
	  		})
	  },
	  showToast: function(msg){
				wx.showToast({
						title:msg,
						success:function(){
							setTimeout(function(){wx.hideToast()},5000)
						}
				});
		}
};

Page(login);
