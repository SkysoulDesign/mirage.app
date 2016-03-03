import {Observable} from "data/observable";
import {cache, navigate, api, file} from "../Modules/Helpers";
import {topmost} from "ui/frame";
import {ApiUserInterface, ApiExtraInterface, ApiProductInterface} from "../Interfaces/ApiUserInterface";
import barcodeScanner = require("nativescript-barcodescanner");
import OpenUrl = require( "nativescript-openurl" );
import {StackLayout} from "ui/layouts/stack-layout";
import imageModule = require('ui/image');
import LabelModule = require("ui/label");
import gridModule  = require ("ui/layouts/grid-layout");
import {GestureTypes} from "ui/gestures";
import activityIndicatorModule = require("ui/activity-indicator");
import {ApiUrlInterface} from "../Interfaces/ApiUrlInterface";
import {ImageMetaDataInterface} from "../Interfaces/ImageMetaDataInterface";
import {ApiCodesInterface} from "../Interfaces/ApiUserInterface";
import {BaseModel} from "./BaseModel";
import {Page} from "ui/page";

export class ProductMainPageModel extends BaseModel {

    private page:Page;
    private user:ApiUserInterface;
    private codes:ApiCodesInterface;
    private context:ImageMetaDataInterface;
    private components:{profile:{}, figure:{}, extra:{}} = {};

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

        console.log('FOII UMA VEZ PORRA')

        /**
         * Profile Tab
         * @type {{name: "ui/label".Label, code: "ui/label".Label}}
         */
        this.components.profile = {
            name: new LabelModule.Label(),
            code: new LabelModule.Label()
        };

        this.components.profile.name.className = "header-title";
        this.components.profile.code.className = "header-description";

        /**
         * Figure
         * @type {{image: "ui/image".Image}}
         */
        this.components.figure = {
            image: new imageModule.Image(),
        };

        this.components.figure.image.className = 'statue';

        /**
         * Extra Content
         * @type {{title: "ui/label".Label, description: "ui/label".Label, image: "ui/image".Image}}
         */
        this.components.extra = {
            title: new LabelModule.Label(),
            description: new LabelModule.Label(),
            loading: new activityIndicatorModule.ActivityIndicator(),
            image: new imageModule.Image(),
            grid: new gridModule.GridLayout()
        };

        this.components.extra.title.className = "card-title";
        this.components.extra.description.className = "card-description";
        this.components.extra.image.className = 'card-bg';
        this.components.extra.grid.className = 'card-container';

    }

    public init() {

        var components = this.components;

        var profile_tab_container = this.page.getViewById('profile_container');
            profile_tab_container.addChild(components.profile.name);
            profile_tab_container.addChild(components.profile.code);

        var figure_container = this.page.getViewById('product_container');
            figure_container.addChild(components.figure.image);

        var extra_container = this.page.getViewById('extras_container');

            components.extra.grid.addChild(components.extra.title);
            components.extra.grid.addChild(components.extra.description);
            components.extra.grid.addChild(components.extra.loading);
            components.extra.grid.addChild(components.extra.image);

            extra_container.addChild(components.extra.grid);





        //for (var extra in this.codes.product.extras) {
        //    this.setupContainer(this.codes.product.extras[extra]);
        //}

    }

    /**
     * Refresh Page Data
     */
    public refresh(){

        this.addFigureImage();
        this.setupProfile();

    }

    /**
     * Setup profile tab
     */
    private setupProfile() {
        this.components.profile.name.text = this.codes.product.name;
        this.components.profile.code.text = this.codes.code;
    }

    /**
     * Add Toy Figure
     */
    private addFigureImage() {
        this.components.figure.image.imageSource = file.load(this.context.filename);
    }

    /**
     * Setup extra container viewer
     * @param extra
     */
    private setupContainer(extra:ApiExtraInterface) {

        //this.components.extra.grid.on(GestureTypes.tap, function () {
        //    navigate.to('video', {context: extra})
        //});

        this.components.extra.loading.busy = true;
        this.components.extra.title.text = extra.title;
        this.components.extra.description.text = extra.description;

        var _this = this;

        api.fetchImage(api.getBase() + extra.image, function (imageSource) {
            _this.components.extra.image.imageSource = imageSource;
            loading.busy = false;
        });

    }

    /**
     * Open Camera to Scan QRCode
     */
    public tapScanQRCode() {
        //navigate.to('register-product');
        navigate.to('main-page');
        //navigate.back();
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