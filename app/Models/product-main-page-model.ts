import {Observable} from "data/observable";
import {cache} from "../Modules/Helpers";
import {topmost} from "ui/frame";
import {ApiUserInterface} from "../Interfaces/ApiUserInterface";
import {navigate} from "../Modules/Helpers";
import barcodeScanner = require("nativescript-barcodescanner");

export class ProductMainPageModel extends Observable {

    /**
     * Constructor
     */
    constructor() {

        super();

        /**
         * Set Defaults
         */
        var user:ApiUserInterface = cache.get('login');

        this.set('username', user.username);
        this.set('email', user.email);

    }

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
                    context: 'MF001-11111-11111-11111'
                });
            }
        );

    }

    /**
     * Open Menu
     */
    public tapOpenMenu() {

        var sideDrawer = topmost().getViewById("sideDrawer");
        sideDrawer.toggleDrawerState();

    }

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