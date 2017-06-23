var app = getApp();

let vlogin = {
	  data: {
	    	wait: 60,
	    	userName: "",
	    	allow: true,
	    	getVarifyCodeUrl: "",
	    	varifyCode: "",
	    	varifyCodeTime: "获取验证码",
	    	hasSend: false
	  },
	  goBack: function(e){
	  		wx.navigateBack({
	  				delta: 1
	  		});
	  },
	  inputUserName: function(e){
	  		let userName = e.detail.value;
	  		if(!/^1[3,5,7,8]{1}[0-9]{9}$/g.test(userName)){
	  				this.showToast("请输入正确的手机号码");
	  				this.setData({
					  		allow: true
			  		})
	  				return false;
	  		}
	  		let varifyCode = this.data.varifyCode;
	  		if(/^\d{6}$/.test(varifyCode)){
	  				this.setData({
					  		allow: false
			  		})
	  		}
	  		this.setData({
	  				userName: userName,
	  		})
	  },
	  inputVarifyCode: function(e){
	  		let varifyCode = e.detail.value;
	  		if(varifyCode.length != 6 || !/^\d{6}$/.test(varifyCode)){
	  				this.showToast("请输入6位短信验证码");
	  				this.setData({
					  		allow: true
			  		})
	  				return false;
	  		}
	  		let userName = this.data.userName;
	  		if(/^1[3,5,7,8]{1}[0-9]{9}$/g.test(userName)){
	  				this.setData({
					  		allow: false
			  		})
	  		}
	  		this.setData({
	  				userName: userName,
	  		})
	  },
	  sendVarifyCode: function(e){
	  		let userName = this.data.userName;
	  		if(!/^1[3,5,7,8]{1}[0-9]{9}$/g.test(userName)){
	  				this.showToast("请输入正确的手机号码");
	  				return false;
	  		}
	  		// 自己模拟为123456，之后在登录的时候会验证
	  		this.showTime();
	  		return false;
	  		wx.request({
	  				url: this.data.getVarifyCodeUrl,
	  				data:{
	  						tel: userName
	  				},
	  				header:{
	  						'Content-Type': 'application/json'
	  				},
	  				success: function(res){
	  					
	  				}
	  		});
	  },
	  showTime: function(){
	  		var that = this;
	  		if (that.data.wait == 0) {
	  				that.setData({
	  						varifyCodeTime: "获取验证码",
	  						wait : 60,
	  						hasSend: false
	  				});
	  		}else{
	  				let wait = that.data.wait;
	  				that.setData({
	  						varifyCodeTime: (wait-1)+"s",
	  						wait : wait-1,
	  						hasSend: true
	  				});
	  				setTimeout(function(){
	  						that.showTime()
	  				},1000);
	  		}
	  },
	  showToast: function(msg){
				wx.showToast({
						title:msg,
						success:function(){
							setTimeout(function(){wx.hideToast()},5000)
						}
				});
		},
		vlogin: function(e){
				let data = e.detail.value;
				if(data.varifyCode !== "123456"){
						this.showToast("请输入正确的验证码。");
						return false;
				}
				
				wx.setStorageSync("member_vaild_date","21000101000000");
				wx.setStorageSync("member_mobile_no",data.userName);
				wx.setStorageSync("member_pay_password_set",false);
				wx.setStorageSync("member_customer_id",7001);
				if(!wx.getStorageSync("member_pay_password_set")){
						wx.redirectTo({
								url: "setPayPwd"
						})
				}
	  		return false;
	  		wx.request({
	  				url: '',
	  				data: data,
	  				header: {  
			          'Content-Type': 'application/json'  
			      },
			      success: function(res) {  
			        	console.log(res.data)  
								
								//设置storage
								wx.setStorageSync("member_vaild_date",res.data.validDate);
								wx.setStorageSync("member_mobile_no",res.data.tel);
								wx.setStorageSync("member_pay_password_set",res.data.payPasswordSet);
								wx.setStorageSync("member_customer_id",res.data.id);
			      }  
	  		});
		}
};

Page(vlogin);
