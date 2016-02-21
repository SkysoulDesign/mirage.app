"use strict";
var observable_1 = require("data/observable");
var LanguagePageModel = (function (_super) {
    __extends(LanguagePageModel, _super);
    function LanguagePageModel() {
        _super.apply(this, arguments);
    }
    /**
     * Choose Language
     * @param args
     */
    LanguagePageModel.prototype.chooseLanguage = function (args) {
        console.log('test');
        //var page = args.object;
        //if (backToSetting) {
        //    frameModule.topmost().goBack();
        //    console.log("buttonid...." + page.id);
        //}
        //else {
        //    frameModule.topmost().navigate("view/screensize/screensize");
        //    console.log("buttonid...." + page.id);
        //    appSettings.SetLanguage(page.id);
        //}
    };
    return LanguagePageModel;
}(observable_1.Observable));
exports.LanguagePageModel = LanguagePageModel;
//# sourceMappingURL=language-page-model.js.map