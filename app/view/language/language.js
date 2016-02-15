var frameModule = require("ui/frame");
var appSettings = require("../settings");
var backToSetting = false;
exports.chooseLanguage = function(args){
	var page = args.object;
	if(backToSetting){
		frameModule.topmost().goBack();
	}
	else{
		frameModule.topmost().navigate("view/screensize/screensize");
		console.log("buttonid...." + page.id);
		appSettings.SetLanguage(page.id);
	}
}

exports.pageloaded = function(args){
	var page = args.object;
	if(page.navigationContext=="setting")
	{
		backToSetting = true;
	}
}