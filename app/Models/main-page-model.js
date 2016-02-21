"use strict";
var observable_1 = require("data/observable");
var app_1 = require("../app");
var OpenUrl = require("nativescript-openurl");
var MainPageModel = (function (_super) {
    __extends(MainPageModel, _super);
    function MainPageModel() {
        _super.apply(this, arguments);
    }
    MainPageModel.prototype.tapProduct = function () {
        app_1.Mirage.navigate.to("product-main-page");
    };
    ;
    MainPageModel.prototype.tapSoap = function () {
        OpenUrl("http://www.soapstudio.com");
    };
    ;
    MainPageModel.prototype.tapNews = function () {
        app_1.Mirage.navigate.to("mirage-news");
    };
    ;
    MainPageModel.prototype.tapQR = function () {
        app_1.Mirage.navigate.to("scanQR");
    };
    ;
    MainPageModel.prototype.tapSetting = function () {
        app_1.Mirage.navigate.to("settings");
    };
    ;
    return MainPageModel;
}(observable_1.Observable));
exports.MainPageModel = MainPageModel;
//# sourceMappingURL=main-page-model.js.map