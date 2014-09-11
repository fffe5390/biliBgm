var util = {
	
	//用新标签打开链接
	open: function(url){
		var obj = {
			"url": url
		};
		chrome.tabs.create(obj);
	},
	
	//page Actions 表面那个更新数字
	setUpdate: function(num){
		if(num <= 0){
			num = "";
		}
		else{
			num = num.toString();
		}
		chrome.browserAction.setBadgeText({
			text: num
		});
	}
};