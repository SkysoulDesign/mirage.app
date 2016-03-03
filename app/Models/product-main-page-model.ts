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
import {BaseModelWithMainNavigation} from "./BaseModelWithMainNavigation";

export class ProductMainPageModel extends BaseModelWithMainNavigation {

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
         * Extra Container
         * @returns {{title, description, loading: activityIndicatorModule.ActivityIndicator, image, grid: org.nativescript.widgets.GridLayout}}
         */
        this.components.extra = function () {

            /**
             * Extra Content
             * @type {{title: "ui/label".Label, description: "ui/label".Label, image: "ui/image".Image}}
             */
            var extra = {
                title: new LabelModule.Label(),
                description: new LabelModule.Label(),
                loading: new activityIndicatorModule.ActivityIndicator(),
                image: new imageModule.Image(),
                grid: new gridModule.GridLayout()
            };

            extra.title.className = "card-title";
            extra.description.className = "card-description";
            extra.image.className = 'card-bg';
            extra.grid.className = 'card-container';

            return extra;

        };

    }

    /**
     * Setup
     */
    public setup() {

        this.set('username', this.user.username);
        this.set('email', this.user.email);
        this.set('title', this.codes.product.name);

        var components = this.components;

        var profile_tab_container = this.page.getViewById('profile_container');
            profile_tab_container.addChild(components.profile.name);
            profile_tab_container.addChild(components.profile.code);

        var figure_container = this.page.getViewById('product_container');
            figure_container.addChild(components.figure.image);

        var extra_container = <StackLayout>this.page.getViewById('extras_container');

        for (var extra in this.codes.product.extras) {
            this.setupContainer(extra_container, this.codes.product.extras[extra]);
        }

        this.addFigureImage();
        this.setupProfileTab();

    }

    /**
     * Setup profile tab
     */
    private setupProfileTab() {
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
     * @param container
     * @param extra
     */
    private setupContainer(container, extra:ApiExtraInterface) {

        var comp = this.components.extra();

        comp.grid.className = 'card-container';
        comp.grid.on(GestureTypes.tap, function () {
            navigate.to('video', {context: extra})
        });

        comp.loading.busy = true;

        comp.title.text = extra.title;
        comp.title.className = "card-title";

        comp.description.text = extra.description;
        comp.description.className = "card-description";

        comp.image.className = 'card-bg';

        api.fetchImage(api.getBase() + extra.image, function (imageSource) {
            comp.image.imageSource = imageSource;
            comp.loading.busy = false;
        });

        comp.grid.addChild(comp.image);
        comp.grid.addChild(comp.title);
        comp.grid.addChild(comp.description);
        comp.grid.addChild(comp.loading);

        container.addChild(comp.grid);

    }

    /**
     * Open Camera to Scan QRCode
     */
    public tapScanQRCode() {
        navigate.to('register-product');
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