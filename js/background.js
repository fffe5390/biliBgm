$(document).ready(
	function(){
		//第一次打开初始化工作
		if(DAL.getFvList() === null){
			DAL.setFvList([]);
		}
		
		if(DAL.getBgmList() === null){
			DAL.setBgmList([]);
		}
		
		if(DAL.getRecList() === null){
			DAL.setRecList([]);
		}
		
		net.updateBgmList();
		
		setInterval(net.updateBgmList, CONFIG.ITV_TIME);
	});