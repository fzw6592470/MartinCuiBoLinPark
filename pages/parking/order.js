var app = getApp();

Page({
	data:{
		fee: 0,
		balance: 0,
		times:"",
		entryTime: "",
		leaveTime: "",
		parkingName: "",
		type: 0,
		canPay: false,
		wasteNo: "",
		validTimes: undefined,
		payBoxShow: false
	},
	onLoad: function(opt){
		opt = {
			wasteNo: "123456789",
			parkingCode: "123456789",
			parkingName: "深圳车公庙工业区停车场",
			parkingAddress: "深圳车公庙工业区停车场",
			entryTime: "170523",
			times: 1445,
			amount: 18,
			paid: 0,
			currentAmount: 18,
			lastPaidTime: "",
			timeoutTimes: 170,
			validTimes: 60
		};
		let fee = Number(opt.currentAmount).toFixed(2);
		let times = this.formatTime(opt.times);
		var entryTime = opt.entryTime;
		entryTime = entryTime.slice(0,2)+":"+entryTime.slice(2,4);
		let leaveTime = this.leaveTimeMath(opt.entryTime,opt.times);
		let balance = 20.00;
		let wasteNo = opt.wasteNo;
		var canPay,type;
		if(balance>fee){
			canPay = true;
			type = 1;
		}else{
			canPay = false;
			type = 0;
		}
		this.setData({
			fee: fee,
			entryTime: entryTime,
			leaveTime: leaveTime,
			parkingName: opt.parkingName,
			parkingAddress: opt.parkingAddress,
			parkingCode: opt.parkingCode,
			validTimes: opt.validTimes,
			balance: balance.toFixed(2),
			canPay: canPay,
			type:type,
			times:times,
			wasteNo:wasteNo
		});
	},
	formatTime: function(times){
		var param = Number(times);
		var days  = param / 60 / 24;
		var daysRound   = Math.floor(days);
		var hours    = param/ 60 - (24 * daysRound);
		var hoursRound   = Math.floor(hours);
		var minutes   = param - (24 * 60 * daysRound) - (60 * hoursRound);
		if(daysRound == 0 && hoursRound == 0){
			return minutes + '分钟';
		}else if(daysRound == 0){
			return hoursRound + '小时' + minutes + '分钟';
		}else{
//			return daysRound + '天' + hoursRound + '小时' + minutes + '分钟'; 
			return (daysRound*24+ hoursRound) + '小时' + minutes + '分钟'; 
		}
	},
	leaveTimeMath: function(entryTime,times){
		var hours = Number(entryTime.substr(0,2));
		var minute = Number(entryTime.substr(2,2));  
		var total = hours*60 + minute + Number(times);  
		var foo = "" + (total/60);    
		var boo = foo.split(".");
		var leaveHours = Number(boo[0]);
		var leaveMinute = total - leaveHours*60;
return ((leaveHours%24)<10?"0"+leaveHours%24:leaveHours%24) + ":" + (leaveMinute<10?"0"+leaveMinute:leaveMinute);
	},
	chooseType: function(e){
		let type = e.currentTarget.dataset.type;
		
		this.setData({
			type: type
		});
	},
	goPay: function(e){
		var that =this;
		let type = this.data.type;
		
		if(type == 0){//微信支付
			
			let customerId = wx.getStorageSync("member_customer_id");
			console.log("customerId:"+customerId);
			let payType = 1;
			let wasteNo = this.data.wasteNo;
			console.log("wasteNo:"+wasteNo);
			let fee = this.data.fee*100;
			console.log("fee:"+fee);
			let appId = wx.getStorageSync("appId");
			console.log("appId:"+appId);
			
			let openId = wx.getStorageSync("user_info")['openId'];
			console.log("openId:"+openId);
			
			wx.redirectTo({
				url: "success"
			})
//			wx.request({
//				url: "",
//				data:{
//					"appId": appId,
//				},
//				method: "post",
//	  				dataType: "json",
//				header: {
//				    'content-type': 'application/json'
//				},
//				success: function(res){
//					let res_code = res.bizCode;
//					let res_result = res.bizResult;
//					if(res_code == 0){
//						let res_detail = res.bizDetail;
//						
//						let mchId = {}
//					}else{
//						that.showToast(res_result);
//					}
//				},
//				fill: function(e){
//					that.showToast("网络错误,请稍后再试.");
//				}
//			})
		}else if(type == 1){//钱包支付
			this.setData({
				payBoxShow: true
			})
		}
	},
	showToast: function(msg){
		wx.showToast({
			title:msg,
			success: function(){
				setTimeout(function(){wx.hideToast()},5000);
			}
		});
	}
});