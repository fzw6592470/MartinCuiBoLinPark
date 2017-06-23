var app = getApp();

let setPayPwd = {
	  data: {
	    	fee: 50,
	    	showActive: 1,
	    	sub_url: "http://m.jinyipark.com/ws/phoenix/bolin/parking/wechatpay",
	    	showReActive: 0,
	    	payPassword: [],
	    	repayPassword: [],
	    	"keyboardShow": false,
	    	"list":{
						number: [1,2,3,4,5,6,7,8,9,0],
						letterone: ["Q","W","E","R","T","Y","U","I","O","P"],
						lettertwo: ["A","S","D","F","G","H","J","K","L"],
						letterthree: ["Z","X","C","V","B","N","M"],
				},
				i:[],
				j:[],
				whatActive: "showActive",
	  },
	  clickCodeItem: function(e){
				let index = e.currentTarget.dataset.num;
				var showActive = 0;
				if(index == "0"){
					showActive = 1;
				}else if(index == "1"){
					showActive = 2;
				}else if(index == "2"){
					showActive = 3;
				}else if(index == "3"){
					showActive = 4;
				}else if(index == "4"){
					showActive = 5;
				}else if(index == "5"){
					showActive = 6;
				}
				this.setData({
					'showActive': showActive,
					'keyboardShow': true,
					whatActive: "showActive"
				});
		},
		clickReCodeItem: function(e){
				let index = e.currentTarget.dataset.num;
				var showReActive = 0;
				if(index == "0"){
					showReActive = 1;
				}else if(index == "1"){
					showReActive = 2;
				}else if(index == "2"){
					showReActive = 3;
				}else if(index == "3"){
					showReActive = 4;
				}else if(index == "4"){
					showReActive = 5;
				}else if(index == "5"){
					showReActive = 6;
				}
				this.setData({
					'showReActive': showReActive,
					'keyboardShow': true,
					whatActive: "showReActive"
				});
		},
		chooseItemCode: function(e){
				let _that = e.currentTarget;
				var t,ico;
				let whatActive = this.data.whatActive;
				var spotCodeList,a;
				if(whatActive == "showActive"){
						spotCodeList=this.data.payPassword;
						a=(this.data.showActive-1);
						t =this.data.i.length;
						ico =this.data.i; 
				}else{
						spotCodeList=this.data.repayPassword;
						a=(this.data.showReActive-1);
						t =this.data.j.length;
						ico =this.data.j; 
				}

				if(t==a){
						if(6>t){
							spotCodeList[t] = _that.dataset.value;
							ico.push(_that.dataset.value);
							if(whatActive == "showActive"){
									this.setData({
											"payPassword": spotCodeList,
											'showActive': (this.data.showActive+1),
											i:ico
									});
							}else{
									this.setData({
											"repayPassword": spotCodeList,
											'showReActive': (this.data.showReActive+1),
											j:ico
									});
							}
							
							if(5==t){
								var exg = /^\d{6}$/g,val = ico.join("");
								if(!exg.test(val)){
									wx.showToast({title:"不能输入非法字符，只能输入6位数字。",success:function(){setTimeout(function(){wx.hideToast()},5000)}});
									return false;
								}
								this.setData({
									"keyboardShow": false
								});
								
							}
						}
				}else{
					spotCodeList[a] = _that.dataset.value;
					ico[a]=_that.dataset.value;
					if(whatActive == "showActive"){
							this.setData({
									"payPassword": spotCodeList,
									'showActive': (this.data.showActive+1),
									i:ico
							});
					}else{
							this.setData({
									"repayPassword": spotCodeList,
									'showReActive': (this.data.showReActive+1),
									j:ico
							});
					}
					
					
					if(6==t){
						var exg = /^\d{6}$/g,val = ico.join("");
						if(!exg.test(val)){
						 	wx.showToast({title:"不能输入非法字符，只能输入6位数字。",success:function(){setTimeout(function(){wx.hideToast()},5000)}});
							return false;
						}
						this.setData({
							"keyboardShow": false
						});
					}
			}
	},
	deleteItemCode: function(e){
		let whatActive = this.data.whatActive;
		var spotCodeList,a,ico;
		if(whatActive == "showActive"){
		 		spotCodeList = this.data.payPassword;
		 		a = this.data.showActive;
				ico = this.data.i;
		}else{
		 		spotCodeList = this.data.repayPassword;
		 		a = this.data.showReActive;
				ico = this.data.j;
		}
//		var itemCode = spotCodeList[this.data.showActive-1];
		var t=ico.length;
		if(t>=0){
			ico.pop();
			spotCodeList[a-1] = "";
			if(whatActive == "showActive"){
					this.setData({
							i:ico,
							payPassword: spotCodeList,
							'showActive': this.data.showActive,
					});
			}else{
					this.setData({
							j:ico,
							repayPassword: spotCodeList,
							'showReActive': this.data.showReActive,
					});
			}
		}else{
			this.setData({
				"keyboardShow": true
			});
		}
	},
	setPayPassword: function(e){
			var that =this;
			let password = this.data.payPassword.join("");
			let repassword = this.data.repayPassword.join("");
			if(password !== repassword){
					this.showToast("二次输入的密码不一致");
					return false;
			}
			wx.request({
					url: "http://10.1.3.122:18211/ws/bolinapplet/applet/mem/setpaypwd",
					data: {
							"customerId": wx.getStorageSync("member_customer_id"),
							"password": password
					},
					method: "post",
					success: function(res){
							let rep = res.data;
							if(rep.bizCode == 0){
									wx.setStorageSync("member_pay_password_set",true);
			
									wx.switchTab({
											url: "../parking/index",
									});
							}else{
									that.showToast(rep.bizResult);
							}
					}
			});
			
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

Page(setPayPwd);
