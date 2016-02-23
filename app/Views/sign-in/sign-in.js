var vmModule = require("../../Models/sign-in-page-model");
var Helpers_1 = require("../../Modules/Helpers");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new vmModule.SignInPageModel();
    console.dir(Helpers_1.database.all());
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=sign-in.js.map