$(document).ready(
	function(){
		net.updateBgmList();
		
		var fNewFvList = $("#fNewFvList");
		
		//从缓存获取喜爱番组数据
		var fvList = DAL.getFvList();
		
		//从缓存中获取rec
		var recList = DAL.getRecList();
		
		//将fvList中的番添加到html中
		$.each(fvList, function(index, element){
			fNewFvList.append('<li spid="' + element.spid + '" bgmcount="' + element.bgmcount + '"><a href="#"><span>' + element.title + '</span>&nbsp;<span>' + element.bgmcount + '</span></a></li>');
		});
		
		//为每个条目绑定点击链接，地址依赖于fNewBgmList元素中的li子元素中的a子元素的第一个元素的文本
		$("#fNewFvList").children("li").children("a").bind("click", function(){
			util.open("http://www.bilibili.com/sp/" + encodeURIComponent($(this).children().first().text()));
		});
		//还绑定一个点击之后同步单条rec目录
		$("#fNewFvList").children("li").bind("click", function(){
			for(var i = 0; i < recList.length; i++)
			{
				if(recList[i].spid === parseFloat($(this).attr("spid"))){
					recList[i].bgmcount = $(this).attr("bgmcount");
					DAL.setRecList(recList);
					DAL.syncRecFv();
					break;
				}
			}
		});
		
		//为存在更新的番着色
		$.each($("#fNewFvList").children("li"), function(index, element){
			for(var i = 0; i < recList.length; i++){
				if(parseFloat($(element).attr("spid")) === recList[i].spid){
					if(parseFloat($(element).attr("bgmcount")) > parseFloat(recList[i].bgmcount)){
						$(element).attr("class", "new");
					}
					break;
				}
			}
		});
	});