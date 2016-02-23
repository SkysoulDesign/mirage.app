
var frameModule = require("ui/frame");
var signinVM = require("../viewmodel/signin-view-model");
var user = signinVM.instance;
function pageLoaded(args){
	var page = args.object;
	page.bindingContext = user;
	 user.set("isLoading",false);
}
exports.pageLoaded = pageLoaded;

function signinSuccess(){
	return user.signinSuccess();
}	
exports.signinSuccess = signinSuccess;

exports.pageUnloaded = function(){
	user.signOut();
}