var app = getApp();

let payPassword = {
	  data: {
	    	oldPassword: "",
	    	newPassword: "",
	    	reNewPassword: "",
	  },
	  inputOldPassword: function(e){
	  		let password = e.detail.value;
	  		if(!/^\d{6}$/g.test(password)){
	  				this.showToast("旧密码需由6位数字组成");
	  				return false;
	  		}
	  		this.setData({
	  				oldPassword: password
	  		})
	  },
	  inputNewPassword: function(e){
	  		let password = e.detail.value;
	  		if(!/^\d{6}$/g.test(password)){
	  				this.showToast("新密码需由6位数字组成");
	  				return false;
	  		}
	  		
	  		this.setData({
	  				newPassword: password
	  		})
	  },
	  inputReNewPassword: function(e){
	  		let password = e.detail.value;
	  		if(!/^\d{6}$/g.test(password)){
	  				this.showToast("重复新密码需由6位数字组成");
	  				return false;
	  		}
	  		let newPassword = this.data.newPassword;
	  		if(newPassword !== password){
	  				this.showToast("二次输入的密码不一致");
	  				
	  				return false;
	  		}
	  		this.setData({
	  				reNewPassword: password
	  		})
	  },
	  changePayPassword: function(e){
	  		let value = e.detail.value;
	  		let oldPassword = value.oldPassword;
	  		let newPassword = value.newPassword;
	  		let reNewPassword = value.reNewPassword;
	  		if(!/^\d{6}$/g.test(oldPassword)){
	  				this.showToast("旧密码请输入6位数字的组合");
	  				
	  				return false;
	  		}
	  		if(!/^\d{6}$/g.test(newPassword)){
	  				this.showToast("新密码请输入6位数字的组合");
	  				
	  				return false;
	  		}
	  		if(!/^\d{6}$/g.test(reNewPassword)){
	  				this.showToast("重复新密码请输入6位数字的组合");
	  				
	  				return false;
	  		}
	  		if(newPassword !== reNewPassword){
	  				this.showToast("二次输入的密码不一致");
	  				return false;
	  		}
	  		
	  		let data = {
	  				oldPass: oldPassword,
	  				newPass: newPassword
	  		}
	  		
	  		console.log(data);
	  		//请求修改
	  		
	  		//跳转页面
	  		wx.showToast({title:"修改成功",success: function(){
	  				setTimeout(function(){
	  						wx.hideToast();
	  						wx.switchTab({
										url: "../account/index",
								});
	  				},3000);
	  		}})
	  		
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

Page(payPassword);
