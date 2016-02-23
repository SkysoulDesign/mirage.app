"use strict";
var vmModule = require("../../Models/sign-in-page-model");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new vmModule.SignInPageModel();
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=sign-in.js.map