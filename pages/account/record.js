var app = getApp();

Page({
	data:{
		hasRecord: true,
		noPayRecord: true,
		recordTabBar: false, //true为已支付，false为未支付
		record_list: [
			{
				data:"20170313",
				dayDetail:[
					{
						"wasteNo":"1234567",
						"parkingCode": 0,
						"parkingName": "深圳市南山区清华信息港停车场",
						"parkingAddress": "深圳市南山区清华信息港停车场",
						"parkingType": 1,
						"platNo": "粤B12345",
						"platColor": "蓝",
						"spotCode": "123456",
						"payResult": 0,
						"entryTime": "125921",
						"times": 189,
						"fee": 2100,
					},
					{
						"wasteNo":"1234567",
						"parkingCode": 0,
						"parkingName": "深圳市南山区清华信息港停车场",
						"parkingAddress": "深圳市南山区清华信息港停车场",
						"parkingType": 0,
						"platNo": "粤B12345",
						"platColor": "蓝",
						"spotCode": "123456",
						"payResult": 1,
						"entryTime": "125921",
						"times": 180,
						"fee": 2100,
					},

					{
						"wasteNo":"1234567",
						"parkingCode": 0,
						"parkingName": "深圳市南山区清华信息港停车场",
						"parkingAddress": "深圳市南山区清华信息港停车场",
						"parkingType": 1,
						"platNo": "粤B12345",
						"platColor": "蓝",
						"spotCode": "123456",
						"payResult": 0,
						"entryTime": "125921",
						"times": 180,
						"fee": 2100,
					}
				]
			},
			{
				data:"20170201",
				dayDetail:[
					{
						"wasteNo":"1234567",
						"parkingCode": 0,
						"parkingName": "深圳市南山区清华信息港停车场",
						"parkingAddress": "深圳市南山区清华信息港停车场",
						"parkingType": 1,
						"platNo": "粤B12345",
						"platColor": "蓝",
						"spotCode": "123456",
						"payResult": 1,
						"entryTime": "125921",
						"times": 180,
						"fee": 2100,
					},
					{
						"wasteNo":"1234567",
						"parkingCode": 0,
						"parkingName": "深圳市南山区清华信息港停车场",
						"parkingAddress": "深圳市南山区清华信息港停车场",
						"parkingType": 0,
						"platNo": "粤B12345",
						"platColor": "蓝",
						"spotCode": "123456",
						"payResult": 0,
						"entryTime": "125921",
						"times": 180,
						"fee": 2100,
					},

					{
						"wasteNo":"1234567",
						"parkingCode": 0,
						"parkingName": "深圳市南山区清华信息港停车场",
						"parkingAddress": "深圳市南山区清华信息港停车场",
						"parkingType": 0,
						"platNo": "粤B12345",
						"platColor": "蓝",
						"spotCode": "123456",
						"payResult": 1,
						"entryTime": "125921",
						"times": 180,
						"fee": 2100,
					}
				]
			},
			{
				data:"20170101",
				dayDetail:[
					{
						"wasteNo":"1234567",
						"parkingCode": 0,
						"parkingName": "深圳市南山区清华信息港停车场",
						"parkingAddress": "深圳市南山区清华信息港停车场",
						"parkingType": 1,
						"platNo": "粤B12345",
						"platColor": "蓝",
						"spotCode": "123456",
						"payResult": 0,
						"entryTime": "125921",
						"times": 180,
						"fee": 2100,
					},
					{
						"wasteNo":"1234567",
						"parkingCode": 0,
						"parkingName": "深圳市南山区清华信息港停车场",
						"parkingAddress": "深圳市南山区清华信息港停车场",
						"parkingType": 1,
						"platNo": "粤B12345",
						"platColor": "蓝",
						"spotCode": "123456",
						"payResult": 0,
						"entryTime": "125921",
						"times": 180,
						"fee": 2100,
					},
					{
						"wasteNo":"1234567",
						"parkingCode": 0,
						"parkingName": "深圳市南山区清华信息港停车场",
						"parkingAddress": "深圳市南山区清华信息港停车场",
						"parkingType": 0,
						"platNo": "粤B12345",
						"platColor": "蓝",
						"spotCode": "123456",
						"payResult": 0,
						"entryTime": "125921",
						"times": 180,
						"fee": 2100,
					},
					{
						"wasteNo":"1234567",
						"parkingCode": 0,
						"parkingName": "深圳市南山区清华信息港停车场",
						"parkingAddress": "深圳市南山区清华信息港停车场",
						"parkingType": 1,
						"platNo": "粤B12345",
						"platColor": "蓝",
						"spotCode": "123456",
						"payResult": 1,
						"entryTime": "125921",
						"times": 189,
						"fee": 2100,
					}
				]
			},
		],
	},
	showOtherRecord: function(){
		this.setData({
			recordTabBar: !this.data.recordTabBar
		})
	},
	onShow:function(){
		var record_list = this.formatRecord(this.data.record_list);
		
		this.setData({
			record_list: record_list
		});
	},
	formatRecord:function(record_list){
		for(var i=0;i<record_list.length;i++){
			record_list[i].data = record_list[i].data.slice(0,4)+"年"+record_list[i].data.slice(4,6)+"月"+record_list[i].data.slice(6,8)+"日";
			for(var j=0;j<record_list[i].dayDetail.length;j++){
				record_list[i].dayDetail[j].fee = (record_list[i].dayDetail[j].fee/100).toFixed(2);
				record_list[i].dayDetail[j].entryTime = (Number(record_list[i].dayDetail[j].entryTime.slice(0,2))>10?record_list[i].dayDetail[j].entryTime.slice(0,2):'0'+record_list[i].dayDetail[j].entryTime.slice(0,2))+":"+(Number(record_list[i].dayDetail[j].entryTime.slice(2,4))>10?record_list[i].dayDetail[j].entryTime.slice(2,4):'0'+record_list[i].dayDetail[j].entryTime.slice(2,4));
				let times = record_list[i].dayDetail[j].times%(24*60);
				let hours = (times/60).toString().split(".")[0];
				let minutes = times - Number(hours)*60; 
				let leaveHours = Number(record_list[i].dayDetail[j].entryTime.slice(0,2))+Number(hours);
				let leaveMinute = Number(record_list[i].dayDetail[j].entryTime.slice(3,5))+minutes;
				if(leaveMinute > 60){
					leaveHours += 1;
					leaveMinute = leaveMinute-60;
				}
				record_list[i].dayDetail[j].leaveTime =(leaveHours>10?leaveHours:'0'+leaveHours)  +":"+  (leaveMinute<10?'0'+leaveMinute:leaveMinute);
			}
		}
		return record_list;
	},
	goPay: function(e){
		let index = e.currentTarget.dataset.item.split(",");
		let item = this.data.record_list[index[0]].dayDetail[index[1]];
		console.log(item);
	}
});
