var frameModel = require("ui/frame");
var observableModule = require("data/observable");
var config = require("../config");
var fetchModule = require("fetch");
// var text1,text2,text3,text4;
exports.pageLoaded = function(args){
	var page = args.object;
	// var label = page.getViewById("label1");
	// label.textWrap = true;
	// label.textAlignment = "center";
	var str = page.navigationContext;
	console.log("str////"+str.substr(0,5));
	var source = new observableModule.Observable({
		text1: str.substr(0,5),
		text2: str.substr(6,5),
		text3: str.substr(12,5),
		text4: str.substr(18,5)
	});
	// page.bindingContext = source;
	page.bindingContext = source;
	var url = config.productUrl+source.get("text1");
	fetchModule.fetch(url).then(function(response) { 
		return response.json(); }).then(function (r) {
		console.log("response.json--"+JSON.stringify(r));
		console.log("response.json--"+r.name);
		source.set("productimage",config.apiUrl+r.image);
	}, function (e) {
	    console.log("errorrrrrr--"+e);
	});

		// fetchModule.fetch('http://223.197.27.204/api/product/mf001')
		// .then(function(response){
		// 	// console.log("response--"+response);
			
		// 	// console.log("response.text--"+response.text());
		// 	// console.log("response.formData--"+response.formData());
		// 	// console.log("response.stringify--"+JSON.stringify(response);
  //       });

};

exports.tapRegister = function(){
	frameModel.topmost().navigate("view/registerproduct/registersuccess");
}