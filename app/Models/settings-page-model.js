"use strict";
var observable_1 = require("data/observable");
var app_1 = require("../app");
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
        app_1.Mirage.navigate.to("login", this.navigationEntry);
    };
    ;
    /**
     * Navigate to Language
     */
    SettingsPageModel.prototype.tapLanguage = function () {
        app_1.Mirage.navigate.to("language", this.navigationEntry);
    };
    ;
    /**
     * Navigate to Screen
     */
    SettingsPageModel.prototype.tapScreen = function () {
        app_1.Mirage.navigate.to("screen-size", this.navigationEntry);
    };
    ;
    return SettingsPageModel;
}(observable_1.Observable));
exports.SettingsPageModel = SettingsPageModel;
//# sourceMappingURL=settings-page-model.js.map