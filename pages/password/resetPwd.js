var app = getApp();

let wallet = {
	  data: {
	    	newPassword: "",
	    	reNewPassword: "",
	  },
	  inputNewPassword: function(e){
	  		let password = e.detail.value;
	  		if(password.length < 8 || !/[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*/.test(password)){
	  				this.showToast("请输入8位以上的数字与字母的组合");
	  				return false;
	  		}
	  		
	  		this.setData({
	  				newPassword: password
	  		})
	  },
	  inputReNewPassword: function(e){
	  		let password = e.detail.value;
	  		if(password.length < 8 || !/[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*/.test(password)){
	  				this.showToast("请输入8位以上的数字与字母的组合");
	  				
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
	  changePassword: function(e){
	  		let value = e.detail.value;
	  		let newPassword = value.newPassword;
	  		let reNewPassword = value.reNewPassword;
	  		if(newPassword.length < 8 || !/[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*/.test(newPassword)){
	  				this.showToast("新密码请输入8位以上的数字与字母的组合");
	  				
	  				return false;
	  		}
	  		if(reNewPassword.length < 8 || !/[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*/.test(reNewPassword)){
	  				this.showToast("重复新密码请输入8位以上的数字与字母的组合");
	  				
	  				return false;
	  		}
	  		if(newPassword !== reNewPassword){
	  				this.showToast("二次输入的密码不一致");
	  				return false;
	  		}
	  		
	  		let data = {
	  				tel: wx.getStorageSync("member_mobile_no"),
	  				newPass: newPassword
	  		}
	  		
	  		console.log(data);
	  		//请求修改
	  		
	  		//跳转页面
	  		wx.showToast({title:"重置成功",success: function(){
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

Page(wallet);
