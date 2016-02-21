var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
function navigateTo(name){
	var navigationEntry = {
	    moduleName: name,
	    backstackVisible: true
	    // clearHistory: false
	};
	topmost.navigate(navigationEntry);
}

function tapRegister(){
	// var topmost = frameModule.topmost();
	navigateTo("view/register/register");
	console.log("register");
}
exports.tapRegister = tapRegister;

function tapLogin(){
	// var topmost = frameModule.topmost();
	navigateTo("view/Signin/Signin");
}
exports.tapLogin = tapLogin;
