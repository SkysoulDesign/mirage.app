import {Observable} from "data/observable";
import OpenUrl = require( "nativescript-openurl" );
import {ApiUserInterface} from "../Interfaces/ApiUserInterface";
import barcodeScanner = require("nativescript-barcodescanner");
import {navigate, cache, api, config, file} from "../Modules/Helpers";
import {topmost} from "ui/frame";
import {Image} from "ui/image";
import ImageSource = require("image-source"); 
import {GestureTypes} from "ui/gestures";
export class MainPageModel extends Observable {

    /**
     * Constructor
     */
    constructor(product_layout) {

        super();

        /**
         * Set Defaults
         */
        var user:ApiUserInterface = cache.get('login');

        this.set('username', user.username);
        this.set('email', user.email);
        this.init(user,product_layout);

    }
    private init(user,product_layout) {
        var _this = this;
        console.dir(user.codes);
        for(var x in user.codes) {
            product_layout.addChild(_this.createImage(user.codes[x].product.image, user.codes[x].product.code));
        }
    }
    private createImage(url,name){
        var _this = this;
        var image = new Image();
        if(file.has(name)){
            image.imageSource = file.load(name);
            console.log("has");
        }
        else{
            var onSuccess = function(image1, metadata) {
                image.imageSource = image1;
                file.save(image1, name);
                console.log("success");
            }
            var onError = function(error) {
                alert(error);
            }
            console.log("fetch");
            api.fetchImage(api.getBase() + url, onSuccess, onError);
        }
        // image.imageSource = api.getImage("http://192.168.1.253" + url, name);//"http://192.168.1.253"+url;//
        console.log("TTTTTTTTTTTTTTT" + api.getBase(true) + url);
        image.on(GestureTypes.tap, function(args) {
            _this.tapProduct();
        });
        return image;
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

