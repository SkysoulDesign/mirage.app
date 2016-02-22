var vmModule = require("../../Models/sign-in-page-model");
var statusBar = require("nativescript-status-bar");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new vmModule.SignInPageModel();
    statusBar.hide();
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=sign-in.js.map