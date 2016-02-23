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
    /**
     * Open Camera to hologram
     */
    public tapTologram() {
        App.navigate.to("product-main-page");
    };
    /**
     * Open Camera to soap
     */
    public tapSoap() {
        OpenUrl("http://www.soapstudio.com");
    };
    /**
     * Open Camera to new
     */
    public tapNews() {
        App.navigate.to("mirage-news");
    };
    /**
     * Open Camera to settings
     */
    public tapSetting() {
        App.navigate.to("settings");
    };

}

