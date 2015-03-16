var DAL = {
	
	setBgmList: function(obj){
		localStorage.setItem("bgmList", JSON.stringify(obj));
	},
	
	getBgmList: function(){
		return JSON.parse(localStorage.getItem("bgmList"));
	},
	
	setFvList: function(obj){
		localStorage.setItem("fvList", JSON.stringify(obj));
	},
	
	getFvList: function(){
		return JSON.parse(localStorage.getItem("fvList"));
	},
	
	setRecList: function(obj){
		localStorage.setItem("recList", JSON.stringify(obj));
	},
	
	getRecList: function(){
		return JSON.parse(localStorage.getItem("recList"));
	},
	
	//同步record和fv
	syncRecFv: function(){
		var fvList = DAL.getFvList();
		
		//建立rec的spid数组用于索引
		var recList = DAL.getRecList();
		var recSpidList = [];
		$.each(recList, function(index, element){
			recSpidList.push(element.spid);
		});
		
		//如果某spid在fv里而不再rec里，则判断为新fv的番，执行添加
		$.each(fvList, function(index, element){
			if(recSpidList.indexOf(element.spid) < 0){
				recList.push({"spid": element.spid, "bgmcount": element.bgmcount});
			}
			DAL.setRecList(recList);
		});
		
		//对比fv和rec的bgmcount，计算出有更新的番，推送到pageAction
		var num = 0;
		for(var i = 0; i < fvList.length; i++){
			for(var j = 0; j < recList.length; j++){
				if(fvList[i].spid === recList[j].spid){
					if(parseFloat(fvList[i].bgmcount) > parseFloat(recList[j].bgmcount)){
						num++;
					}
					
					break;
				}
			}
		}
		util.setUpdate(num);
		
		//这里本该写如果某spid在rec里而不再fv里，则判断为不再fv的番，执行删除，但是考虑到某些情况，记录予以保留，在Rec和Bgm同步时再删除
	},
	
	//同步record和bgm
	syncRecBgm: function(){
		var bgmList = DAL.getBgmList();
		
		var bgmSpidList = [];
		$.each(bgmList, function(index, element){
			bgmSpidList.push(element.spid);
		});
		
		var recList = DAL.getRecList();
		
		//删除在Bgm都已经不存在的番，为了不干扰遍历，这里的数组删除元素采用的是“留坑”的方法
		$.each(recList, function(index, element){
			if(bgmSpidList.indexOf(element.spid) < 0){
				delete recList[index];
			}
		});
		
		//整理数组
		for(var i = 0; i < recList.length;){
			if(recList[i] === undefined){
				recList.splice(i, 1);
				continue;
			}
			i++;
		}
		
		DAL.setRecList(recList);
	},
	
	//同步Fv和bgm，对于bgm删除的番，fv删除对应的番，对于fv有的番，通过bgm对应的番组信息，更新fv中的所有数据
	syncFvBgm: function(){
		var bgmList = DAL.getBgmList();
		
		var bgmSpidList = [];
		$.each(bgmList, function(index, element){
			bgmSpidList.push(element.spid);
		});
		
		var fvList = DAL.getFvList();
		
		//删除在Bgm都已经不存在的番，为了不干扰遍历，这里的数组删除元素采用的是“留坑”的方法
		$.each(fvList, function(index, element){
			if(bgmSpidList.indexOf(element.spid) < 0){
				delete fvList[index];
			}
		});
		
		//整理数组
		for(var i = 0; i < fvList.length;){
			if(fvList[i] === undefined){
				fvList.splice(i, 1);
				continue;
			}
			i++;
		}
		
		//更新fv
		for(var i = 0; i< fvList.length; i++){
			for(var j = 0; j < bgmList.length; j++){
				if(fvList[i].spid === bgmList[j].spid){
					fvList.splice(i, 1, bgmList[j]);
					break;
				}
			}
		}
		
		DAL.setFvList(fvList);
		
		DAL.syncRecFv();
	},
	
	
	
	//全体同步
	syncAll: function(){
		DAL.syncFvBgm();
		DAL.syncRecBgm();
		DAL.syncRecFv();
	}
};

