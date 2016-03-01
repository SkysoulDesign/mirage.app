import {Observable} from "data/observable";
import OpenUrl = require( "nativescript-openurl" );
import {ApiUserInterface} from "../Interfaces/ApiUserInterface";
import barcodeScanner = require("nativescript-barcodescanner");
import {navigate, cache, api, config, file, parseURL, isEven} from "../Modules/Helpers";
import {topmost} from "ui/frame";
import ImageModule = require("ui/image");
import ImageSource = require("image-source");
import {GestureTypes} from "ui/gestures";
import {ImageMetaDataInterface} from "../Interfaces/ImageMetaDataInterface";


export class MainPageModel extends Observable {

    /**
     * Constructor
     */
    constructor(product_layout) {

        super();

        //if (product_layout.getChildrenCount() > 0)
        //    return;

        /**
         * Set Defaults
         */
        var user:ApiUserInterface = cache.get('login');

        this.set('username', user.username);
        this.set('email', user.email);

        this.init(user, product_layout);

    }

    /**
     * Init
     * @param user
     * @param product_layout
     */
    private init(user, product_layout) {

        for (var x in user.codes) {

            var image = this.createImage(user.codes[x].product.image);

            image.cssClass = isEven(x) ? 'background-statue' : 'foreground-statue';

            product_layout.addChild(image);

        }

    }

    private createImage(url:string):ImageModule.Image {

        var _this = this,
            image = new ImageModule.Image(),
            url = parseURL(url);

        api.fetchImage(api.getBase() + url.full, function (imageSource) {
            image.imageSource = imageSource;
        });

        image.on(GestureTypes.tap, function () {
            _this.tapProduct();
        });

        return image;

    }

    /**
     * Open Camera to Scan QRCode
     */
    public tapScanQRCode() {

        navigate.to('register-product');

        return;

        /**
         * Scan QRCode
         */
        //barcodeScanner.scan({
        //    cancelLabel: "Stop Scanning", // iOS only, default 'Close'
        //    message: "Go Scan Something", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
        //    preferFrontCamera: false,     // Android only, default false
        //    showFlipCameraButton: true    // Android only, default false (on iOS it's always available)
        //}).then(function (result) {
        //        navigate.to('register-product', {
        //            context: result.text
        //        });
        //    },
        //    function (error) {
        //        console.log("No scan: " + error);
        //        navigate.to('register-product', {
        //            context: 'MF001-11111-11111-11111'
        //        });
        //    }
        //);

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
    public tapProduct() {
        navigate.to('product-main-page');
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

