import {Observable} from "data/observable";
import {cache, navigate, api} from "../Modules/Helpers";
import {topmost} from "ui/frame";
import {ApiUserInterface, ApiExtraInterface} from "../Interfaces/ApiUserInterface";
import barcodeScanner = require("nativescript-barcodescanner");
import OpenUrl = require( "nativescript-openurl" );
import {StackLayout} from "ui/layouts/stack-layout";
import imageModule = require('ui/image');
import LabelModule = require("ui/label");
import {GridLayout}  from "ui/layouts/grid-layout";
import {GestureTypes} from "ui/gestures";
import activityIndicatorModule = require("ui/activity-indicator");

export class ProductMainPageModel extends Observable {

    /**
     * Loader counter
     */
    private counter:number;

    /**
     * Constructor
     */
    constructor(container:StackLayout) {

        super();

        var _this = this;

        /**
         * Set Loading
         */
        this.set('isLoading', true);

        api.fetch('product', {'product_id': 'MF001'}, function (data) {

            _this.counter = data.extras.length;

            for (var extra in data.extras) {
                _this.setupContainer(container, data.extras[extra]);
            }

        });

        /**
         * Set Defaults
         */
        var user = cache.get('login');

        this.set('username', user.username);
        this.set('email', user.email);

    }

    /**
     * Setup extra container viewer
     * @param container
     * @param extra
     */
    private setupContainer(container, extra:ApiExtraInterface) {

        var _this = this,
            grid = new GridLayout();
            grid.className = 'card-container';
            grid.on(GestureTypes.tap, function () {
                navigate.to('video', { context:extra })
            });

        var loading = new activityIndicatorModule.ActivityIndicator();
            loading.busy = true;

        var title = new LabelModule.Label();
            title.text = extra.title;
            title.className = "card-title";

        var description = new LabelModule.Label();
            description.text = extra.description;
            description.className = "card-description";

        var image = new imageModule.Image();
            image.className = 'card-bg';

        api.fetchImage(api.getBase() + extra.image, function (imageSource) {
            image.imageSource = imageSource;
            loading.busy = false;
            grid.addChild(title);
            grid.addChild(description);
        });

        grid.addChild(loading);
        grid.addChild(image);

        container.addChild(grid);

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

    public tapProduct() {
        navigate.to("video");
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