var net = {
	updateBgmList: function(){
		$.getJSON(CONFIG.BGM_URL, function(json){
			DAL.setBgmList(json);
		});
		DAL.syncAll();
	}
}