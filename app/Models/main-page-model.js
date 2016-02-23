var observable_1 = require("data/observable");
var OpenUrl = require("nativescript-openurl");
var barcodeScanner = require("nativescript-barcodescanner");
var Helpers_1 = require("../Modules/Helpers");
var MainPageModel = (function (_super) {
    __extends(MainPageModel, _super);
    function MainPageModel() {
        _super.apply(this, arguments);
    }
    /**
     * Open Camera to Scan QRCode
     */
    MainPageModel.prototype.tapScanQRCode = function () {
        /**
         * Scan QRCode
         */
        barcodeScanner.scan({
            cancelLabel: "Stop Scanning",
            message: "Go Scan Something",
            preferFrontCamera: false,
            showFlipCameraButton: true // Android only, default false (on iOS it's always available) 
        }).then(function (result) {
            Helpers_1.navigate.to('register-product', {
                context: result.text
            });
        }, function (error) {
            console.log("No scan: " + error);
            Helpers_1.navigate.to('register-product', {
                context: 'MF001-11111111111111111111'
            });
        });
    };
    /**
     * Open Camera to hologram
     */
    MainPageModel.prototype.tapTologram = function () {
        Helpers_1.navigate.to("product-main-page");
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
        Helpers_1.navigate.to("mirage-news");
    };
    ;
    /**
     * Open Camera to settings
     */
    MainPageModel.prototype.tapSetting = function () {
        Helpers_1.navigate.to("settings");
    };
    ;
    return MainPageModel;
})(observable_1.Observable);
exports.MainPageModel = MainPageModel;
//# sourceMappingURL=main-page-model.js.map