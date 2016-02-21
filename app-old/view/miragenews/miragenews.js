// var htmlViewModule = require("ui/html-view");
var observableModule = require("data/observable");

var repeater = new observableModule.Observable({
	"myItems" : [
	{
		"icon": "Icon1",
		"title":"Title1",
		"date":"Date1",
		"content":"Content1"
	},{
		"icon": "Icon2",
		"title":"Title2",
		"date":"Date2",
		"content":"Content2"
	},{
		"icon": "Icon3",
		"title":"Title3",
		"date":"Date3",
		"content":"Content3"
	},{
		"icon": "Icon3",
		"title":"Title3",
		"date":"Date3",
		"content":"Content3"
	}
	,{
		"icon": "Icon3",
		"title":"Title3",
		"date":"Date3",
		"content":"Content3"
	}
	,{
		"icon": "Icon3",
		"title":"Title3",
		"date":"Date3",
		"content":"Content3"
	}
	,{
		"icon": "Icon3",
		"title":"Title3",
		"date":"Date3",
		"content":"Content3"
	}
	,{
		"icon": "Icon3111111111111111111111111111111111111111111111111",
		"title":"Title3111111111111111111111111111111111111111111111111",
		"date":"Date3111111111111111111111111111111111111111111111111111111",
		"content":"Content3111111111111111111111111111111111111111111111111111111"
	}

	]
});
exports.pageLoaded = function(args){
	// var htmlView = new htmlViewModule.HtmlView();
	// htmlView.html = '<span><font color="#ff3399">Test</font></span>';
	var page = args.object;
	page.bindingContext = repeater;
}
