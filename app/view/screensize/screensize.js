var frameModule = require("ui/frame");
var appSettings = require("../settings");
var backToSetting = false;

exports.choosescreensize = function(args){
	var page = args.object;
	if(backToSetting){
		frameModule.topmost().goBack();
	}
	else{
		frameModule.topmost().navigate("view/login/login");
		console.log("screensize* * * "+page.id);
		appSettings.SetScreensize(page.id);
	}
}

exports.pageloaded = function(args){
	var page = args.object;
	if(page.navigationContext=="setting")
	{
		backToSetting = true;
	}
}