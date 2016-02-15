var frameModel = require("ui/frame");
var animation = require("ui/animation");
var bg,help;
var observable = require("data/observable");
var user = new observable.Observable({
	isvisible: 0
});
exports.pageLoaded = function(args){
	var page = args.object;
	page.bindingContext = user;
	bg = page.getViewById("image-bg");
	help = page.getViewById("image-help");
	bg.animate({
		translate:{ x:0,y:525},
		duration:1
	});
	help.animate({
		translate:{ x:0,y:500},
		duration:1
	});
}
exports.tapHint = function(){

}

exports.tapmodel = function(){
	frameModel.topmost().navigate("view/video/video");
}
exports.tapHelp = function(){
	user.set("isvisible",1);
	// bg.animate({
	// 	translate:{ x:0,y:0},
	// 	duration:1000
	// });
	help.animate({
		translate:{ x:0,y:0},
		duration:1000
	});
}	
exports.tapHideHelp = function(){
	// user.set("isvisible",0);
	// bg.animate({
	// 	translate:{ x:0,y:525},
	// 	duration:1000
	// });
	help.animate({
		translate:{ x:0,y:500},
		duration:1000
	}).then(function(){
		user.set("isvisible",0);
	});
}	