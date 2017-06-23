var app = getApp();

Page({
	data:{
		type: "car",
		parkingType: null,
		list:{
			areaone: ["京","津","冀","鲁","晋","蒙","辽","吉","黑","沪"],
			areatwo: ["苏","浙","皖","闽","赣","豫","鄂","湘","粤","桂"],
			areathree: ["渝","川","贵","云","藏","陕","甘","青","琼","新"],
			areafour: ["宁"],
			number: [1,2,3,4,5,6,7,8,9,0],
			letterone: ["Q","W","E","R","T","Y","U","I","O","P"],
			lettertwo: ["A","S","D","F","G","H","J","K","L"],
			letterthree: ["Z","X","C","V","B","N","M"],
		},
		keyboardShow: true,
		showProvince: true,
		allow: false,
		showActive: 1,
		defaultPlatNo : ['粤'],
		codeItemNum: 0,
		e:"",
		t:"",
		i:[],
		changePlatNo: [],
		hoverClass: "background:'#fff'"
	},
	onLoad: function(option){
		let parkingType = option.parkingType;
		let platNo = option.platNo;
		let type = option.type;
	    this.setData({
	    	parkingType:parkingType,
	    	type:type,
	    	showProvince: parkingType=='parking'?false:true,
	    	defaultPlatNo: platNo==undefined?['粤']:platNo.split(""),
	    	allow: platNo==undefined?false:true,
	    	i : platNo==undefined?[]:platNo.split(""),
	    	changePlatNo: platNo==undefined?['粤']:platNo.split("")
	    });
	},
	onShow:function(){
		
	},
	showToast: function(msg){
		wx.showToast({
			title:msg,
			success:function(){
				setTimeout(function(){wx.hideToast()},5000)
			}
		});
	},
	choiceArea: function(e){
		this.setData({
			keyboardShow: true,
			showProvince: false,
			showActive:1
		});
	},
	clickCodeItem: function(e){
		let index = Number(e.currentTarget.dataset.num);
		this.setData({
			keyboardShow: false,
			showProvince: true,
			showActive:(index+1)
		});
	},
	chooseLetter: function(e){
		let value = e.currentTarget.dataset.value;
		let platNo = this.data.defaultPlatNo;
		if(this.data.showActive == 1){
			
			platNo[0] = value;
			this.setData({
		    	defaultPlatNo: platNo,
		    	allow: platNo.length>=7?true:false,
		    	i : platNo,
		    	showActive: 2,
		    	keyboardShow: false,
				showProvince: true,
		    });
		}else if(this.data.showActive == 2){
			var exg = /\d$/g
			if(exg.test(value)){
				return false;
			}
			
			platNo[1] = value;
			this.setData({
				defaultPlatNo: platNo,
		    	allow: platNo.length>=7?true:false,
		    	i : platNo,
		    	showActive: 3,
		    	keyboardShow: false,
				showProvince: true,
		    });
		}else{
			platNo[this.data.showActive-1] = value;
			this.setData({
				defaultPlatNo: platNo,
		    	allow: platNo.length>=7?true:false,
		    	i : platNo,
		    	showActive: (this.data.showActive+1),
		    	keyboardShow: platNo.length>7?true:false,
				showProvince: true,
		    });
		}
	},
	deleteItemCode: function(e){
		let platNo = this.data.defaultPlatNo;
		let index = this.data.showActive;
		platNo[index-1] = "";
		var allow = false;
		if(platNo<7){
			allow = false;
		}else{
			allow: true
		};
		for(var i=0;i<platNo.length-1;i++){
			if(platNo[i] == ""){
				allow = false;
			}
		}
		this.setData({
			defaultPlatNo: platNo,
	    	allow: allow,
	    	i : platNo,
	    	showActive: this.data.showActive,
	    	keyboardShow: platNo.length>7?true:false,
			showProvince: true,
	    });
	},
	queryParking: function(e){
		let allow = this.data.allow;
		if(allow){
			
			let platNo = this.data.defaultPlatNo.join("");
			console.log(platNo);
			
			let data = {
				'platNo': platNo
			};
			
			wx.navigateTo({
				url: "../parking/order"
			})
		}else{
			return false;
		}
	},
	addCar: function(e){
		let allow = this.data.allow;
		if(allow){
			if(this.data.changePlatNo.join("") == this.data.defaultPlatNo.join("")){
				
				wx.navigateBack({
					delta: 1
				});
				return ;
			}
			let platNo = this.data.defaultPlatNo.join("");
			console.log(platNo);
			
			let data = {
				'platNo': platNo
			};
			
		}else{
			return false;
		}
	},
});
