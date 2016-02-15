var frameModel = require("ui/frame");
var width,height;
var r = 40 , d=2.5;
var observableModule = require("data/observable");

exports.pageLoaded = function(args){
 	var page = args.object;
	width = page.getMeasuredWidth();
	height = page.getMeasuredHeight();
	// var centerX = width*0.5-r;
	// var centerY = height*0.5-r;
	// var tmp = new observableModule.Observable({
	// 	left1:centerX,
	// 	top1:centerY,
	// 	left2:centerX,
	// 	top2:centerY-d*r,
	// 	left3:centerX+d*r*Math.cos(30/360*Math.PI*2),
	// 	top3:centerY+d*r*Math.sin(30/360*Math.PI*2),
	// 	left4:centerX-d*r*Math.cos(30/360*Math.PI*2),
	// 	top4:centerY+d*r*Math.sin(30/360*Math.PI*2),
	// });
	// page.bindingContext = tmp;
}

exports.tapAccount = function(){
	var navigationEntry = {
	    moduleName: "view/login/login",
	    backstackVisible: false,
	    context: "setting"
		};
	frameModel.topmost().navigate(navigationEntry);
	// frameModel.topmost().navigate("view/login/login");
};

exports.tapLanguage = function(){
	var navigationEntry = {
	    moduleName: "view/language/language",
	    backstackVisible: false,
	    context: "setting"
		};
	frameModel.topmost().navigate(navigationEntry);
	// frameModel.topmost().navigate("view/language/language");
};

exports.tapScreen = function(){
	var navigationEntry = {
	    moduleName: "view/screensize/screensize",
	    backstackVisible: false,
	    context: "setting"
		};
	frameModel.topmost().navigate(navigationEntry);
	// frameModel.topmost().navigate("view/screensize/screensize");
};