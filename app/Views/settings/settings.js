"use strict";
var vmModule = require("../../Models/settings-page-model");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new vmModule.SettingsPageModel();
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=settings.js.map