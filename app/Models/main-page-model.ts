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
import {ApiUrlInterface} from "../Interfaces/ApiUrlInterface";
import {BaseModelInterface} from "../Interfaces/BaseModelInterface";
import {page} from "ui/builder";
import {Page} from "ui/page";
import application = require('application')
import {BaseModel} from "./BaseModel";

export class MainPageModel extends BaseModel {

    private user:ApiUserInterface;

    /**
     * Constructor
     */
    constructor() {

        super();

        /**
         * Set Defaults
         */
        this.user = cache.get('login');

        this.set('username', this.user.username);
        this.set('email', this.user.email);

        //this.init();

    }

    /**
     * Refresh User
     */
    public refreshLogin() {
        api.fetch('checkLogin', {}, null, function (error) {
            navigate.to('login', {clearHistory: true});
        }, false);
    }


    /**
     * Init
     */
    private init() {

        var container = <Page>this.get('page').getViewById("product_layout");

        for (var x in this.user.codes) {

            var image = this.createImage(this.user.codes[x].product.image);

            image.cssClass = isEven(x) ? 'background-statue' : 'foreground-statue';

            container.addChild(image);

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
            _this.tapProduct(url);
        });

        return image;

    }

    /**
     * Open Camera to Scan QRCode
     */
    public tapScanQRCode() {
        navigate.to('register-product');
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
    public tapProduct(url:ApiUrlInterface) {
        navigate.to('product-main-page', {context: {url: url}});
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

