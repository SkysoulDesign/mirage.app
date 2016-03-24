var frameModule = require("ui/frame");
var appSettings = require("../settings");
var backToSetting = false;
exports.chooseLanguage = function(args){
	var page = args.object;
	if(backToSetting){
		frameModule.topmost().goBack();
		console.log("buttonid...." + page.id);
	}
	else{
		frameModule.topmost().navigate("view/screensize/screensize");
		console.log("buttonid...." + page.id);
		appSettings.SetLanguage(page.id);
	}
}

exports.pageLoaded = function(args){
	var page = args.object;
	if(page.navigationContext=="setting")
	{
		backToSetting = true;
	}
}