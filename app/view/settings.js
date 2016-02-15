var appSettings = require("application-settings");
// var firstLoadApp = appSettings.getBoolean("firstLoadApp", true);
exports.GetAutoLogin = function(){
	return appSettings.getBoolean("autoLogin", true);
}
exports.SetAutoLogin = function(l){
	appSettings.setBoolean("autoLogin", l);
}
exports.SetLanguage = function(l){
	appSettings.setString("language",l);
}
exports.GetLanguage = function(){
	return appSettings.getString("language");
}
exports.SetScreensize = function(l){
	appSettings.setNumber("screensize",l);
}
exports.GetScreensize = function(){
	return parseFloat(appSettings.getNumber("screensize").toFixed(1));
}