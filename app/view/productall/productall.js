var frameModel = require("ui/frame");
var absoluteLayoutModule = require("ui/layouts/absolute-layout");
var labelModule = require("ui/label");
var colorModule = require("color");
var ImageModule = require("ui/image");
var gestures = require("ui/gestures");
var enumsModule = require("ui/enums")
var ImageSourceModule = require("image-source");
var observableModule = require("data/observable");
var productModel = require("../viewmodel/productall-view-model");
var width,height;
var absoluteLayout;
var UIs;

var r = 80 ,d = 90 , num = 20;

exports.tapmodel = function(){
	frameModel.topmost().navigate("view/video/video");
}


exports.pageLoaded = function(args){
	var page = args.object;
	width = page.getMeasuredWidth();
	height = page.getMeasuredHeight();
	console.log("pageLoaded；；；"+height);
	console.log("height"+page.height);
	absoluteLayout = new absoluteLayoutModule.AbsoluteLayout();
	width = width==0?300:width;
	height = height==0?300:height;
	absoluteLayout.width = width;
	absoluteLayout.height = height;
	page.content = absoluteLayout;
	absoluteLayout.style.backgroundColor = new colorModule.Color("#fff");
	var centerX = width*0.5-r*0.5;
	var centerY = height*0.5-r*0.5;
	UIs = new Array();	
	var a = centerX,b = centerY ,h = d;
	var sqrt3 = Math.cos(30/360*Math.PI*2)*2;

	var c01 = createButton1(a, b);
    var c11 = createButton1(a, b-h);
    var c12 = createButton1(a + sqrt3*h/2, b - h/2);
    var c13 = createButton1(a + sqrt3*h/2, b + h/2);
    var c14 = createButton1(a, b + h);
    var c15 = createButton1(a - sqrt3*h/2, b + h/2);
    var c16 = createButton1(a - sqrt3*h/2, b - h/2);

    var c21 = createButton1(a, b-2*h);
    var c22 = createButton1(a + sqrt3*h/2, b-3*h/2);
    var c23 = createButton1(a + sqrt3*h, b - h);
    var c24 = createButton1(a + sqrt3*h, b);
    var c25 = createButton1(a + sqrt3*h, b + h);
    var c26 = createButton1(a + sqrt3*h/2, b + 3*h/2);
    var c27 = createButton1(a, b + 2*h);
    var c28 = createButton1(a - sqrt3*h/2, b + 3*h/2);
    var c29 = createButton1(a - sqrt3*h, b + h);
    var c210 = createButton1(a - sqrt3*h, b);
    var c211 = createButton1(a - sqrt3*h, b - h);
    var c212 = createButton1(a - sqrt3*h/2, b-3*h/2);
    UIs.push(c01);
    UIs.push(c11);
    UIs.push(c12);
    UIs.push(c13);
    UIs.push(c14);
    UIs.push(c15);
    UIs.push(c16);
    UIs.push(c21);
    UIs.push(c22);
    UIs.push(c23);
    UIs.push(c24);
    UIs.push(c25);
    UIs.push(c26);
    UIs.push(c27);
    UIs.push(c28);
    UIs.push(c29);
    UIs.push(c210);
    UIs.push(c211);
    UIs.push(c212);

    var m = 0;
    for (var i in productModel.productall) {
    	// productModel.productall[i]
    	pushButton(UIs[m],productModel.productall[i]);
    	m++;
    	console.log("i::::"+i);
    };
    // console.log("i::::"+productModel.productall.length);
    // for (var i = 0; i < productModel.productall.length; i++) {
    // 	pushButton(UIs[i],productModel.productall[i].image);
    // 	console.log("i::::"+i);
    // };
  //       absoluteLayout.on(gestures.GestureTypes.pan,function(args){
		// if(args.state == gestures.GestureStateTypes.ended )
		// {
		// 	var length = new Array();
		// 	for (var i = 0; i < UIs.length; i++) {
		// 	var l = absoluteLayoutModule.AbsoluteLayout.getLeft(UIs[i]);
		//  	var t = absoluteLayoutModule.AbsoluteLayout.getTop(UIs[i]);
		//  	length.push(l*l+t*t);
		// 	};
		// 	var min = length[0],k = 0;
		// 	for (var i = 0; i < length.length; i++) {
		// 		if(length[i] < min)
		// 		{
		// 			min = length[i];
		// 			k=i;
		// 		}
		// 	};
		// 	var offsetX = centerX - absoluteLayoutModule.AbsoluteLayout.getLeft(UIs[k]);
		//  	var offsetY = centerY - absoluteLayoutModule.AbsoluteLayout.getTop(UIs[k]);
		// 	for (var i = 0; i < UIs.length; i++) {
		// 		// UIs[i].animate({
		// 		// 	translate: { x: offsetX, y: offsetY},
		// 		//     duration: 500,
		// 		//     curve: enumsModule.AnimationCurve.easeIn
		// 		// }).then(function(){
		// 		// 	updateUI(UIs[i]);
		// 		// 	console.log("Left:::"+absoluteLayoutModule.AbsoluteLayout.getLeft(UIs[i]));
		// 		// });
		// 	};
		// }
		// });
     //    page.animate({
					// translate: { x: 100, y: 100},
				 //    duration: 5000
     //    });
}
function pushButton(image,product){
	image.src = product.image;
	image.id = product.id.toString();
	absoluteLayout.addChild(image);
	updateUI(image);
	image.on(gestures.GestureTypes.tap,function(args){
		// frameModel.topmost().navigate("view/video/video");
		var navigationEntry = {
		    moduleName: "view/video/video",
		    context: {info: "something you want to pass to your page"}
		};
		frameModel.topmost().navigate(navigationEntry);
	});
}
function createButton1(x,y){
	return createButton(x,y,r,"123");
}
function createButton(left,top,r,id){
	// console.log("createButton");
	var image = new ImageModule.Image();
	// image.src = "~/image/test.png";
	// image.imageSource = ImageSourceModule.fromFile("~/image/test.jpg");
	absoluteLayoutModule.AbsoluteLayout.setLeft(image, left);
	absoluteLayoutModule.AbsoluteLayout.setTop(image, top);
	image.width = r;
	image.height = r;
	// image.id = id;
	image.stretch = enumsModule.Stretch.fill;
	
	// image.on(gestures.GestureTypes.tap,function(args){
	// 	// tapmodel();
	// 	frameModel.topmost().navigate("view/video/video");
	// });
	// image.style.backgroundColor = new colorModule.Color("Red");
	// updateUI(image);
	// absoluteLayout.addChild(image);

	var left=0,top=0;
	absoluteLayout.on(gestures.GestureTypes.pan,function(args){
		if(args.state == gestures.GestureStateTypes.began)
		{
			left = absoluteLayoutModule.AbsoluteLayout.getLeft(image);
		 	 top = absoluteLayoutModule.AbsoluteLayout.getTop(image);
		 	 // console.log("Left:::"+absoluteLayoutModule.AbsoluteLayout.getLeft(image));
		}
		absoluteLayoutModule.AbsoluteLayout.setLeft(image, left+args.deltaX);
		absoluteLayoutModule.AbsoluteLayout.setTop(image, top+args.deltaY);
		updateUI(image);
		// console.log("Left:::"+absoluteLayoutModule.AbsoluteLayout.getLeft(image));
	});
	var observableObject = new observableModule.Observable();
	observableObject.on(observableModule.Observable.propertyChangeEvent, function(propertyChangeData){
	  console.log(propertyChangeData.propertyName + " has been changed and the new value is: " + propertyChangeData.value);
	});
	return image;
}

function updateUI(image){
	var left=0,top=0;
	left = absoluteLayoutModule.AbsoluteLayout.getLeft(image);
	top = absoluteLayoutModule.AbsoluteLayout.getTop(image);
	var x = left+r*0.5;
	var y = top+r*0.5;
	var minstr = Math.min(x,width-x,y,height-y,r*0.5);
	if(minstr < 0) {minstr = 0;}
	// image.width = minstr*2;
	// image.height = minstr*2;
	image.scaleX = minstr*2/r;
	image.scaleY = minstr*2/r;
}

