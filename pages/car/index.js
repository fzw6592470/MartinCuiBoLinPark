var app = getApp();

Page({
	data:{
		hasCar: true,
		carList: [{"platNo":"粤B12345"},{"platNo":"粤B88888"},{"platNo":"粤B99999"},],
		deleteUrl: "",
		addUrl: "platInput"
	},
	onShow:function(){
		
	},
	deleteCar: function(e){
		let platNo = e.currentTarget.dataset.plat;
		let url = this.data.deleteUrl;
		let data = {
			"platNo": platNo
		}
		console.log(data);
		
		// 删除
		
		let index  = e.currentTarget.dataset.index;
		var carList = this.data.carList;
		carList.splice(index,1);
		this.showToast("删除成功.");
		console.log(carList);
		this.setData({
			carList: carList
		})
	},
	addCar: function(e){
		let type = e.currentTarget.dataset.type;
		let url = this.data.addUrl;
		if(type == "add"){
			var length = this.data.carList.length;
			if(length >= 3){
				this.showToast("一个用户只能绑定3张车牌.");
				return false;
			}else{
				wx.navigateTo({url:url});
			}
		}else{
			let platNo = e.currentTarget.dataset.plat;
			console.log(url+"?platNo="+platNo+"&type=car");
			wx.navigateTo({url:url+"?platNo="+platNo+"&type=car"});
		}
	},
	showToast: function(msg){
		wx.showToast({
			title:msg,
			success:function(){
				setTimeout(function(){wx.hideToast()},5000)
			}
		});
	}
});
