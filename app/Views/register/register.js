"use strict";
var vmModule = require("../../Models/register-page-model");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new vmModule.RegisterPageModel();
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=register.js.map