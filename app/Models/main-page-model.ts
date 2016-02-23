import {Observable} from "data/observable";
import {Mirage as App} from "../app";
import OpenUrl = require( "nativescript-openurl" );
import barcodeScanner = require("nativescript-barcodescanner");
import {navigate} from "../Modules/Helpers";

export class MainPageModel extends Observable {

    /**
     * Open Camera to Scan QRCode
     */
    public tapScanQRCode() {

        /**
         * Scan QRCode
         */
        barcodeScanner.scan({
            cancelLabel: "Stop Scanning", // iOS only, default 'Close'
            message: "Go Scan Something", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
            preferFrontCamera: false,     // Android only, default false 
            showFlipCameraButton: true    // Android only, default false (on iOS it's always available) 
        }).then(function (result) {
                navigate.to('register-product', {
                    context: result.text
                });
            },
            function (error) {
                console.log("No scan: " + error);
                navigate.to('register-product', {
                    context: 'MF001-11111111111111111111'
                });
            }
        );
    }

    /**
     * Open Camera to hologram
     */
    public tapTologram() {
        navigate.to("product-main-page");
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
        navigate.to("mirage-news");
    };

    /**
     * Open Camera to settings
     */
    public tapSetting() {
        navigate.to("settings");
    };

}

