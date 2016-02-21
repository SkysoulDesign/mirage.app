"use strict";
var vmModule = require("../../Models/login-page-model");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new vmModule.LoginModel();
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=login.js.map