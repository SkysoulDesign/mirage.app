var observable_1 = require("data/observable");
var Helpers_1 = require("../Modules/Helpers");
var SettingsPageModel = (function (_super) {
    __extends(SettingsPageModel, _super);
    function SettingsPageModel() {
        _super.apply(this, arguments);
        /**
         * Defaults
         * @type {{backstackVisible: boolean, context: string}}
         */
        this.navigationEntry = {
            backstackVisible: false,
            context: "setting"
        };
    }
    /**
     * Navigate to Account
     */
    SettingsPageModel.prototype.tapAccount = function () {
        Helpers_1.navigate.to("login", this.navigationEntry);
    };
    ;
    /**
     * Navigate to Language
     */
    SettingsPageModel.prototype.tapLanguage = function () {
        Helpers_1.navigate.to("language", this.navigationEntry);
    };
    ;
    /**
     * Navigate to Screen
     */
    SettingsPageModel.prototype.tapScreen = function () {
        // navigate.to("screen-size", this.navigationEntry);
    };
    ;
    return SettingsPageModel;
})(observable_1.Observable);
exports.SettingsPageModel = SettingsPageModel;
//# sourceMappingURL=settings-page-model.js.map