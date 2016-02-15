var frameModule = require("ui/frame");
var timer = require("timer");

function pageLoaded(args) {
    var page = args.object;
    timer.setTimeout(function(){
    	frameModule.topmost().navigate("view/mainpage/mainpage");
    },500);
}
exports.pageLoaded = pageLoaded;