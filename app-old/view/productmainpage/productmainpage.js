var frameModule = require("ui/frame");
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
	// page.bindingContext = page.navigationContext;
}
exports.tapMirage = function(){
	// frameModule.topmost().navigate("view/productall/productall");
	// console.log("pageLoaded；；；"+height);
	var searchbycode = require("../productall/productall");
	var pageFactory = function () {
		return searchbycode.pageLoaded();
	};
	var navEntry = {
	    create: pageFactory,
	    context: "myContext",
	    animated: true
	};
	var topFrame = frameModule.topmost();
	topFrame.navigate(navEntry);
};

exports.tapCode = function(){
	// frameModule.topmost().navigate("view/searchbycode/searchbycode");
	var searchbycode = require("../searchbycode/searchbycode");
	var pageFactory = function () {
		return searchbycode.createPage();
	};
	var navEntry = {
	    create: pageFactory,
	    context: "myContext",
	    animated: true
	};
	var topFrame = frameModule.topmost();
	topFrame.navigate(navEntry);
};

exports.tapMovie = function(){
	frameModule.topmost().navigate("view/searchbymovie/searchbymovie");
};