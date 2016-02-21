
var frameModule = require("ui/frame");
var signinVM = require("../viewmodel/signin-view-model");
var user = signinVM.instance;
function pageloaded(args){
	var page = args.object;
	page.bindingContext = user;
	 user.set("isLoading",false);
}
exports.pageloaded = pageloaded;

function signinSuccess(){
	return user.signinSuccess();
}	
exports.signinSuccess = signinSuccess;

exports.pageUnloaded = function(){
	user.signOut();
}