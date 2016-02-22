var vmModule = require("../../Models/language-page-model");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new vmModule.LanguagePageModel();
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=language.js.map