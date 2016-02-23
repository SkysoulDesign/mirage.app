var vmModule = require("../../Models/mirage-news-page-model");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = new vmModule.MirageNewsPageModel();
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=mirage-news.js.map