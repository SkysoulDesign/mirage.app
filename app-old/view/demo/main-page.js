// var observableModule = require("data/observable");
// var mainviewmode = require("main-view-model");
// var source = new obervableModuel.Obervable();
// var bindingOptions = new mainviewmode{
//     doCheckAvailable: mainviewmode.doCheckAvailable();
//     doCheckHasCameraPermission: mainviewmode.doCheckHasCameraPermission();
//     doRequestCameraPermission: mainviewmode.doRequestCameraPermission();
//     doScanWithBackCamera: mainviewmode.doScanWithBackCamera();
//     doScanWithFrontCamera: mainviewmode.doScanWithFrontCamera();
// }

// function pageLoaded(args) {
//     var page = args.object;
//     page.bindingContext = bindingOptions;
// }
// exports.pageLoaded = pageLoaded;
var vmModule = require("./main-view-model");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;