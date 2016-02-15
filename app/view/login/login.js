var frameModule = require("ui/frame");



function tapRegister(){
	var topmost = frameModule.topmost();
	topmost.navigate("view/register/register");
}
exports.tapRegister = tapRegister;

function tapLogin(){
	var topmost = frameModule.topmost();
	topmost.navigate("view/Signin/Signin");
}
exports.tapLogin = tapLogin;
