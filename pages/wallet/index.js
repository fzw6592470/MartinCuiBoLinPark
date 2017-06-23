var app = getApp();

let wallet = {
	  data: {
	    	fee: 50,
	    	choiceActive: 1,
	    	payType: 0,
	    	loginUrl: "../member/login"
	  },
	  onLoad: function(){
		},
	  onReady: function() {
	    	// Do something when page ready.
	  },
	  onShow: function() {
	    	// Do something when page show.
	  },
	  onHide: function() {
	    	// Do something when page hide.
	  },
	  onUnload: function() {
	    	// Do something when page close.
	  },
	  onPullDownRefresh: function() {
	    	// Do something when pull down.
	  },
	  onReachBottom: function() {
	    	// Do something when page reach bottom.
	  },
	  onShareAppMessage: function () {
	   		// return custom share data when user share.
	  },
	  // Event handler.
	  viewTap: function() {
		    this.setData({
		      	text: 'Set some data for updating view.'
		    })
	  },
	  chargeFeeFormat: function(e){
	    	var value = Number(e.detail.value);
	    	if(value < 0){
	    			value = -value;
	    	}
	    	if(value > 2000){
	    			wx.showToast({
	    					title:"最高只能充值2000元。",
	    					success: function(){
	    							setTimeout(function(){wx.hideToast()},5000);
	    					}
	    			});
	    			return false;
	    	}
	    	this.switchFee(value);
	  },
	  choiceFee: function(e){
	  		var value = e.currentTarget.dataset.value;
	  		this.switchFee(value);
	  },
	  switchFee: function(value){
	  		if(value==50){
	    			this.setData({
	    					fee: value,
	    					choiceActive: 1
	    			});
	    	}else if(value==100){
	    			this.setData({
	    					fee: value,
	    					choiceActive: 2
	    			});
	    	}else if(value==200){
	    			this.setData({
	    					fee: value,
	    					choiceActive: 3
	    			});
	    	}else if(value==500){
	    			this.setData({
	    					fee: value,
	    					choiceActive: 4
	    			});
	    	}
	  },
	  wechatPay: function(e){
	  		var value = Number(this.data.fee);
	  		console.log(value)
	  		if(value > 2000 || value <= 0 ){
	  				wx.showToast({
	    					title:"钱包最低充值1元、最高只能充值2000元.",
	    					success: function(){
	    							setTimeout(function(){wx.hideToast()},5000);
	    					}
	    			});
	  				return false;
	  		}
	  		let data = {
	  				fee: value,
	  				payType: this.data.payType
	  		};
	  		let url = this.data.sub_url;
	  	
	  		//this.sendRequest(data,url,callback);
	  },
	  sendRequest: function(data,url,callback){
	  		wx.request({
	  				url: url,
	  				data: data,
	  				method: "post",
	  				dataType: "json",
	  				header: {
					      'content-type': 'application/json'
					  },
	  				success: function(res){
	  						var res_detail = res.data;
	  						callback(res_detail);
	  				},
	  				fill: function(e){
	  						wx.showToast({
			    					title:"网络错误,请稍后再试.",
			    					success: function(){
			    							setTimeout(function(){wx.hideToast()},5000);
			    					}
			    			});
	  				}
	  		})
	  }
};

Page(wallet);
