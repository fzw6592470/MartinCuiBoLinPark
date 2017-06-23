var app = getApp();

Page({
	data:{
		"hours": ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
		"minutes": ["00","30"],
		"time": ["02","30"],
		"fee": 0.00,
		"list":{
			number: [1,2,3,4,5,6,7,8,9,0],
			letterone: ["Q","W","E","R","T","Y","U","I","O","P"],
			lettertwo: ["A","S","D","F","G","H","J","K","L"],
			letterthree: ["Z","X","C","V","B","N","M"],
		},
		"keyboardShow": false,
		"spotCode":[],
		"orderUrl": "",
		"showActive": 1,
		codeItemNum: 0,
		e:"",
		t:"",
		i:[],
		hoverClass: "background:'#fff'"
	},
	onShow: function(){
		this.setData({
			"fee": (this.data.fee).toFixed(2)
		});
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
			'keyboardShow': true
		});
	},
	chooseItemCode: function(e){
		let _that = e.currentTarget;
		var t=this.data.i.length;
		var a=(this.data.showActive-1);
		var spotCodeList=this.data.spotCode,ico =this.data.i; 
		if(t==(this.data.showActive-1)){
			if(6>t){
				spotCodeList[t] = _that.dataset.value;
				ico.push(_that.dataset.value);
				this.setData({
					"spotCode": spotCodeList,
					'showActive': (this.data.showActive+1),
					i:ico
				});
				
				if(5==t){
					var exg = /[a-zA-Z0-9]$/g,val = ico.join("");
					if(!exg.test(val)){
						wx.showToast({title:"不能输入非法字符，只能输入字母与数字。",success:function(){setTimeout(function(){wx.hideToast()},5000)}});
						return false;
					}
					this.setData({
						"keyboardShow": false
					});
					
					if(this.data.time == ["00","00"]){
						return;
					}else{
						let data = {
							"spotCode" : val,
							"times" : Number(this.data.time[0])*60 + Number(this.data.time[1])
						}
						let url = "";
						//this.sendAjax(url,data,_that.roadQueryFeeCallBack);
					}
				}
			}
		}else{
			spotCodeList[this.data.showActive-1] = _that.dataset.value;
			ico[a]=_that.dataset.value;
			this.setData({
				"spotCode": spotCodeList,
				'showActive': (this.data.showActive+1),
				i:ico
			});
			
			if(6==t){
				var exg = /[a-zA-Z0-9]$/g,val = ico.join("");
				if(!exg.test(val)){
				 	wx.showToast({title:"不能输入非法字符，只能输入字母与数字。",success:function(){setTimeout(function(){wx.hideToast()},5000)}});
					return false;
				}
				this.setData({
					"keyboardShow": false
				});
				
				if(this.data.time == ["00","00"]){
					return;
				}else{
					let data = {
						"spotCode" : val,
						"times" : Number(this.data.time[0])*60 + Number(this.data.time[1])
					}
					let url = "";
					//this.sendAjax(url,data,_that.roadQueryFeeCallBack);
				}
			}
		}
	},
	deleteItemCode: function(e){
		var spotCodeList = this.data.spotCode;
//		var itemCode = spotCodeList[this.data.showActive-1];
		var ico = this.data.i;
		var t=ico.length;
		if(t>=0){
			ico.pop();
			spotCodeList[this.data.showActive-1] = "";
			this.setData({
				i:ico,
				spotCode: spotCodeList,
				'showActive': this.data.showActive,
			});
		}else{
			this.setData({
				"keyboardShow": true
			});
		}
	},
	selectParkingTime: function(e){
		let index = e.detail.value;
		let hour = this.data.hours[index[0]];
		let minute = index[1];
		this.setData({
			"time" : [hour,minute]
		});
	},
	makeOrder: function(e){
		let spotCode = this.data.spotCode;
		
		let time = Number(this.data.time[0])*60 + Number(this.data.time[1]);
		if(spotCode == "" || spotCode.length != 6 || spotCode.test(/^[0-9A-Za-z]{6}$/g)){
			wx.showToast({title:"不能为空或非法字符，只能输入6位字母与数字.",success:function(){setTimeout(function(){wx.hideToast()},5000)}});
			return false;
		}
		if(time == 0){
			wx.showToast({title:"请选择购买停车时长.",success:function(){setTimeout(function(){wx.hideToast()},5000)}});
			return false;
		}
		let url = this.data.orderUrl;
		let data = {
			"spotCode": spotCode,
			"time": time
		};
		console.log(data);
	}
});