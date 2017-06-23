var app = getApp();

let mobileVaild = {
		data:{
				mobNo: "",
				btnText: "发送验证码",
				nextStepText: "下一步： 设置登录密码",
				varifyCode: "",
				allow: true,
				btnAllow: false,
				wait: 60,
				url:"",
		},
	  onLoad: function(opt){
	  		let type = opt.type;
	  		var nextStepText,url;
	  		var mobNo = wx.getStorageSync("member_mobile_no");
				mobNo = mobNo.slice(0,3) + "****" + mobNo.slice(7);
	  		if(type == "login"){
	  				nextStepText = "下一步： 设置登录密码";
	  				url = "resetPwd";
	  		}else if(type == "pay"){
	  				nextStepText = "下一步： 设置支付密码";
	  				url = "resetPayPwd";
	  		}
	  		this.setData({
	  				mobNo: mobNo,
	  				nextStepText: nextStepText,
	  				url: url
	  		});
	  },
	  inputVarifyCode: function(e){
	  		let value = e.detail.value;
	  		if(value.length != 6 || !/^\d{6}$/.test(value)){
	  				this.showToast("请输入6位短信验证码");
	  				this.setData({
					  		btnAllow: false
			  		})
	  				return false;
	  		}
				this.setData({
						varifyCode: value,
						btnAllow: true,
				})
	  },
	  sendVarifyCode: function(e){
	  		this.showTime();
	  		return false;
	  },
	  nextStep: function(e){
	  		let mobNo = wx.getStorageSync("member_mobile_no");
	  		let varifyCode = this.data.varifyCode;
	  		let url = this.data.url+"?mobNo="+mobNo+"&varifyCode="+varifyCode;
	  		wx.navigateTo({
	  				url : url
	  		});
	  },
	  showTime: function(){
	  		var that = this;
	  		if (that.data.wait == 0) {
	  				that.setData({
	  						btnText: "获取验证码",
	  						wait : 60,
	  						allow: true
	  				});
	  		}else{
	  				let wait = that.data.wait;
	  				that.setData({
	  						btnText: (wait-1)+"s",
	  						wait : wait-1,
	  						allow: false
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
};

Page(mobileVaild);
