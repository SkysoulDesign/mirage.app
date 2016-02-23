import {Observable} from "data/observable";
import {Mirage as App} from "../app";
import OpenUrl = require( "nativescript-openurl" );
import barcodescanner = require("nativescript-barcodescanner");
export class MainPageModel extends Observable {

    /**
     * Open Camera to Scan QRCode
     */
    public tapScanQRCode() {

        // alert({
        //     message: 'Scan Code',
        //     okButtonText: 'okay',
        // });
        barcodescanner.scan({
            cancelLabel: "Stop scanning", // iOS only, default 'Close' 
            message: "Go scan something", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.' 
            preferFrontCamera: false,     // Android only, default false 
            showFlipCameraButton: true    // Android only, default false (on iOS it's always available) 
        }).then(
            function(result) {
                console.log("Scan format: " + result.format);
                console.log("Scan text:   " + result.text);
                // var navigationEntry = {
                //     moduleName: "view/registerproduct/registerproduct",
                //     context: result.text
                // };
                // frameModule.topmost().navigate(navigationEntry);
                App.navigate.to('registerproduct',{
                    context: result.text
                });
            },
            function(error) {
                console.log("No scan: " + error);
                // frameModule.topmost().goBack();
                App.navigate.to('register-product', {
                    context: 'MF001-11111111111111111111'
                });
            }
            );
    }

    public tapProduct() {
        App.navigate.to("product-main-page");
    };

    public tapSoap() {
        OpenUrl("http://www.soapstudio.com");
    };

    public tapNews() {
        App.navigate.to("mirage-news");
    };

    public tapQR() {
        App.navigate.to("scanQR");
    };

    public tapSetting() {
        App.navigate.to("settings");
    };

}

