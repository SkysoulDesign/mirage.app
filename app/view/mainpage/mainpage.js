var buttonModel = require("ui/button");
var frameModel = require("ui/frame");
var observableModule = require("data/observable");
var OpenUrl = require( "nativescript-openurl" );
var width,height;
var r = 40 ,num = 5, d=2.5;
// var absoluteLayout;
// var mirage,product,soap,news,QRcode,setting;
function pageLoaded(args) {
    var page = args.object;
	width = page.getMeasuredWidth();
	height = page.getMeasuredHeight();
	// var centerX = 110;
	// var centerY = 110;
	// var tmp = new observableModule.Observable({
	// 	left1:centerX,
	// 	top1:centerY,
	// 	left2:centerX,
	// 	top2:centerY-d*r,
	// 	left3:centerX+d*r*Math.cos(18/360*Math.PI*2),
	// 	top3:centerY-d*r*Math.sin(18/360*Math.PI*2),
		
	// 	left4:centerX+d*r*Math.sin(36/360*Math.PI*2),
	// 	top4:centerY+d*r*Math.cos(36/360*Math.PI*2),
		
	// 	left5:centerX-d*r*Math.sin(36/360*Math.PI*2),
	// 	top5:centerY+d*r*Math.cos(36/360*Math.PI*2),
		
	// 	left6:centerX-d*r*Math.cos(18/360*Math.PI*2),
	// 	top6:centerY-d*r*Math.sin(18/360*Math.PI*2),
		
	// });
	// console.log("left3=="+tmp.left3 + "//////tops3==" + tmp.top3);
	// console.log("tmp.left4=="+tmp.left4 + "//////tmp.tops4==" + tmp.top4);
	// console.log("tmp.left5=="+tmp.left5 + "//////tmp.tops5==" + tmp.top5);
	// console.log("tmp.left6=="+tmp.left6 + "//////tmp.tops6==" + tmp.top6);
	// page.bindingContext = tmp;
}
exports.pageLoaded = pageLoaded;

exports.tapProduct = function(){
	frameModel.topmost().navigate("view/productmainpage/productmainpage");
};

exports.tapSoap = function(){
	OpenUrl("http://www.soapstudio.com");
	// frameModel.topmost().navigate("view/soapstudio/soapstudio")
};

exports.tapNews = function(){
	// OpenUrl("http://www.master-technology.com");
	frameModel.topmost().navigate("view/miragenews/miragenews")
};

exports.tapQR = function(){
	frameModel.topmost().navigate("view/scanQR/scanQR");
};

exports.tapSetting = function(){
	frameModel.topmost().navigate("view/setting/setting");
};
