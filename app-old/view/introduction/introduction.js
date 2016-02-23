
exports.pageLoaded = function(args){
	var page = args.object;
	var lable3 = page.getViewById("lable-3");
	lable3.textWrap = true;
	lable3.textAlignment = "center";
}