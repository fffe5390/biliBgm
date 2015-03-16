$(document).ready(
	function(){
		net.updateBgmList();
		
		var fBgmList = $("#fBgmList");
		
		//从缓存获取所有番组数据
		var bgmList = DAL.getBgmList();
		
		//将番组，添加到html中，利用index标识
		$.each(bgmList, function(index, element){
				fBgmList.append('<li spid="' + element.spid + '"><input type="checkbox" name="'+ index +'" /><a href="#"><span>' + element.title + '</span>&nbsp;<span>' + element.bgmcount + '</span></a></li>');
		});
		
		//找出fv中所有番组spid，放入数组
		var fvList = DAL.getFvList();
		var spids = [];
		$.each(fvList, function(index, element){
			spids.push(element["spid"]);
		});
		
		//将fv的番组对应到按钮上选中
		$("#fBgmList").children("li").children("input").each(function(index,element){
			if(spids.indexOf(bgmList[index]["spid"]) > -1){
				$(element).attr("checked", true);
			}
		});
		
		
		//为每个条目checkbox绑定事件，每次点击将存储选中的番并保存，遍历index，保存实体，页面元素的index与bgmList的元素的顺序一一对应
		$("#fBgmList").children("li").children("input").bind("click", function(){
			var fvList = [];
			$("#fBgmList").children("li").children("input").each(function(index, element){
				if(element.checked){
					fvList.push(bgmList[index]);
				}
			});
			DAL.setFvList(fvList);
			DAL.syncAll();
		});
		
		//为每个条目增加超链接，地址依赖于fNewBgmList元素中的li子元素中的a子元素的第一个元素的文本
		$("#fBgmList").children("li").children("a").bind("click", function(){
			util.open("http://www.bilibili.com/sp/" + encodeURIComponent($(this).children().first().text()));
		});
	});
