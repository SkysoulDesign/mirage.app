var timer = require("timer");
var frameModel = require("ui/frame");

exports.pageLoaded = function(){
	timer.setTimeout(function(){
		frameModel.topmost().navigate("view/mainpage/mainpage");
	},500);
}