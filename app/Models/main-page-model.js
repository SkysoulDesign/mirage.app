"use strict";
var observable_1 = require("data/observable");
var app_1 = require("../app");
var OpenUrl = require("nativescript-openurl");
var barcodescanner = require("nativescript-barcodescanner");
var MainPageModel = (function (_super) {
    __extends(MainPageModel, _super);
    function MainPageModel() {
        _super.apply(this, arguments);
    }
    /**
     * Open Camera to Scan QRCode
     */
    MainPageModel.prototype.tapScanQRCode = function () {
        // alert({
        //     message: 'Scan Code',
        //     okButtonText: 'okay',
        // });
        barcodescanner.scan({
            cancelLabel: "Stop scanning",
            message: "Go scan something",
            preferFrontCamera: false,
            showFlipCameraButton: true // Android only, default false (on iOS it's always available) 
        }).then(function (result) {
            console.log("Scan format: " + result.format);
            console.log("Scan text:   " + result.text);
            // var navigationEntry = {
            //     moduleName: "view/registerproduct/registerproduct",
            //     context: result.text
            // };
            // frameModule.topmost().navigate(navigationEntry);
            app_1.Mirage.navigate.to('registerproduct', {
                context: result.text
            });
        }, function (error) {
            console.log("No scan: " + error);
            // frameModule.topmost().goBack();
            app_1.Mirage.navigate.to('register-product', {
                context: 'MF001-11111111111111111111'
            });
        });
    };
    /**
     * Open Camera to hologram
     */
    MainPageModel.prototype.tapTologram = function () {
        app_1.Mirage.navigate.to("product-main-page");
    };
    ;
    /**
     * Open Camera to soap
     */
    MainPageModel.prototype.tapSoap = function () {
        OpenUrl("http://www.soapstudio.com");
    };
    ;
    /**
     * Open Camera to new
     */
    MainPageModel.prototype.tapNews = function () {
        app_1.Mirage.navigate.to("mirage-news");
    };
    ;
    /**
     * Open Camera to settings
     */
    MainPageModel.prototype.tapSetting = function () {
        app_1.Mirage.navigate.to("settings");
    };
    ;
    return MainPageModel;
}(observable_1.Observable));
exports.MainPageModel = MainPageModel;
//# sourceMappingURL=main-page-model.js.map