var app = getApp();

Page({
	data:{
		"hasBill": true,
		bill_list: [
			{
				data:"20170313",
				dayDetail:[
					{
						"wasteNo":"1234567",
						"orderType": 0,
						"amount": 2100,
						"oldBalance": 562100,
						"transTime": "20170313125921"
					},
					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 1000,
						"oldBalance": 572100,
						"transTime": "20170313180021"
					},

					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 1900,
						"oldBalance": 574000,
						"transTime": "20170313200021"
					}
				]
			},
			{
				data:"20170201",
				dayDetail:[
					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 4800,
						"oldBalance": 650000,
						"transTime": "20170212080650"
					},
					{
						"wasteNo":"1234567",
						"orderType": 0,
						"amount": 2000,
						"oldBalance": 670000,
						"transTime": "20170212150100"
					},

					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 800,
						"oldBalance": 670800,
						"transTime": "20170212180021"
					}
				]
			},
			{
				data:"20170101",
				dayDetail:[
					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 4800,
						"oldBalance": 650000,
						"transTime": "20170102080650"
					},
					{
						"wasteNo":"1234567",
						"orderType": 0,
						"amount": 2000,
						"oldBalance": 670000,
						"transTime": "20170115150100"
					},
					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 100,
						"oldBalance": 670800,
						"transTime": "20170125180121"
					},
					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 900,
						"oldBalance": 670900,
						"transTime": "20170129222021"
					}
				]
			},
		],
	},
	onShow:function(){
		var bill_list = this.formatBill(this.data.bill_list);
		
		this.setData({
			bill_list: bill_list
		});
	},
	formatBill: function(bill_list){
		for(var i=0;i<bill_list.length;i++){
			bill_list[i].data = bill_list[i].data.slice(0,4)+"年"+bill_list[i].data.slice(4,6)+"月";
			for(var j=0;j<bill_list[i].dayDetail.length;j++){
				bill_list[i].dayDetail[j].amount = (bill_list[i].dayDetail[j].amount/100).toFixed(2);
				bill_list[i].dayDetail[j].transTime = bill_list[i].dayDetail[j].transTime.slice(4,6)+"-"+bill_list[i].dayDetail[j].transTime.slice(6,8)+" "+bill_list[i].dayDetail[j].transTime.slice(8,10)+":"+bill_list[i].dayDetail[j].transTime.slice(10,12);
			}
		}
		return bill_list;
	},
	queryBillMore: function(e){
		
		var bill_list = this.data.bill_list;
		var next_bill = [
			{
				data:"20170313",
				dayDetail:[
					{
						"wasteNo":"1234567",
						"orderType": 0,
						"amount": 2100,
						"oldBalance": 562100,
						"transTime": "20170313125921"
					},
					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 1000,
						"oldBalance": 572100,
						"transTime": "20170313180021"
					},

					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 1900,
						"oldBalance": 574000,
						"transTime": "20170313200021"
					}
				]
			},
			{
				data:"20170201",
				dayDetail:[
					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 4800,
						"oldBalance": 650000,
						"transTime": "20170212080650"
					},
					{
						"wasteNo":"1234567",
						"orderType": 0,
						"amount": 2000,
						"oldBalance": 670000,
						"transTime": "20170212150100"
					},

					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 800,
						"oldBalance": 670800,
						"transTime": "20170212180021"
					}
				]
			},
			{
				data:"20170101",
				dayDetail:[
					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 4800,
						"oldBalance": 650000,
						"transTime": "20170102080650"
					},
					{
						"wasteNo":"1234567",
						"orderType": 0,
						"amount": 2000,
						"oldBalance": 670000,
						"transTime": "20170115150100"
					},
					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 100,
						"oldBalance": 670800,
						"transTime": "20170125180121"
					},
					{
						"wasteNo":"1234567",
						"orderType": 1,
						"amount": 900,
						"oldBalance": 670900,
						"transTime": "20170129222021"
					}
				]
			},
		];
		var nextBillList = this.formatBill(next_bill);
		this.setData({
			bill_list: bill_list.concat(nextBillList)
		})
	}
});
