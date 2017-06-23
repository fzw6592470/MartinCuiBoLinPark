var app = getApp();

let passwordManage = {
	  goChange: function(e){
	  		let url = e.currentTarget.dataset.url;
	  		
	  		wx.navigateTo({
	  				url: url
	  		});
	  }
};

Page(passwordManage);
