var searchBarModule = require("ui/search-bar");
var pagesModule = require("ui/page");
var labelModule = require("ui/label");
var ImageModule = require("ui/image");
var colorModule = require("color");
var frameModel = require("ui/frame");
var enumsModule = require("ui/enums");
var gestures = require("ui/gestures");
var app = require("application");
var absoluteLayoutModule = require("ui/layouts/absolute-layout");
var searchVM = require("../viewmodel/search-view-model");
var allProducts;
exports.createPage = function(){
	// var label = new labelModule.Label();
 //    label.text = "Hello, world!";
	 var absoluteLayout = new absoluteLayoutModule.AbsoluteLayout();
	// absoluteLayout.width = 230;
	// absoluteLayout.height = 230;
	absoluteLayout.style.backgroundColor = new colorModule.Color("LightGray");

	absoluteLayout.addChild(createSearchBar(10,10));
	absoluteLayout.addChild(createButton(10,120,100));
	//
	// allProducts = searchVM.searchNew();

    var page = new pagesModule.Page();
    page.content = absoluteLayout;
    console.log(page.height+"1111"+absoluteLayout.width);
	page.on(pagesModule.Page.navigatedToEvent, function () {
	        console.log(JSON.stringify(page.navigationContext));
	 });
	if (app.android) {
		page.actionBarHidden = true;
	}
    return page;
}
function showNew(data){
	// for(k in data){
	// 	data[k].
	// }
}
function showSearch(){

}
function createButton(x,y,width){
	var image = new ImageModule.Image();
	image.src = "~/image/test.png";
	absoluteLayoutModule.AbsoluteLayout.setLeft(image, x);
	absoluteLayoutModule.AbsoluteLayout.setTop(image, y);
	image.width = width;
	image.height = width;
	image.stretch = enumsModule.Stretch.fill;
	image.on(gestures.GestureTypes.tap,function(args){
		var navigationEntry = {
		    moduleName: "view/video/video",
		    context: {info: "something you want to pass to your page"}
		};
		frameModel.topmost().navigate(navigationEntry);
	});
	return image;
}
function createSearchBar(x,y){
	var searchBar = new searchBarModule.SearchBar();
	searchBar.on(searchBarModule.SearchBar.submitEvent, function (args) {
	    console.log("Search for " + args.object.text);
	 	 // searchVM.instance.searchById(args.object.text).then(function(a){
	 	 // 	console.log("then"+a);
	 	 // });
	});
	searchBar.on(searchBarModule.SearchBar.clearEvent, function (args) {
	    console.log("Clear");
	});
	absoluteLayoutModule.AbsoluteLayout.setLeft(searchBar, x);
	absoluteLayoutModule.AbsoluteLayout.setTop(searchBar, y);
	return searchBar;
}
function tapmodel(){
	frameModel.topmost().navigate("view/video/video");
}
// var frameModel = require("ui/frame");
// var animation = require("ui/animation");
// var bg,help;
// var observable = require("data/observable");
// var user = new observable.Observable({
// 	isvisible: 0
// });
// exports.pageLoaded = function(args){
// 	var page = args.object;
// 	page.bindingContext = user;
// 	bg = page.getViewById("image-bg");
// 	help = page.getViewById("image-help");
// 	bg.animate({
// 		translate:{ x:0,y:525},
// 		duration:1
// 	});
// 	help.animate({
// 		translate:{ x:0,y:500},
// 		duration:1
// 	});
// }
// exports.tapHint = function(){

// }

// exports.tapmodel = function(){
// 	frameModel.topmost().navigate("view/video/video");
// }
// exports.tapHelp = function(){
// 	user.set("isvisible",1);
// 	// bg.animate({
// 	// 	translate:{ x:0,y:0},
// 	// 	duration:1000
// 	// });
// 	help.animate({
// 		translate:{ x:0,y:0},
// 		duration:1000
// 	});
// }	
// exports.tapHideHelp = function(){
// 	// user.set("isvisible",0);
// 	// bg.animate({
// 	// 	translate:{ x:0,y:525},
// 	// 	duration:1000
// 	// });
// 	help.animate({
// 		translate:{ x:0,y:500},
// 		duration:1000
// 	}).then(function(){
// 		user.set("isvisible",0);
// 	});
// }	