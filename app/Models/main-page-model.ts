import {Observable} from "data/observable";
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
import {BaseModelWithMainNavigation} from "./BaseModelWithMainNavigation";
import progressModule = require("ui/progress");

export class MainPageModel extends BaseModelWithMainNavigation {

    private page:Page;
    private user:ApiUserInterface;
    private progress:progressModule.Progress;

    /**
     * Constructor
     */
    constructor() {

        super();

        this.progress = new progressModule.Progress();
        this.progress.className = 'progress-bar';

    }

    /**
     * Refresh User
     */
    public refreshLogin() {

        api.fetch('checkLogin', {}, function (data) {
            cache.set('login', data);
        }, function (error) {
            navigate.to('login', {clearHistory: true});
        }, false);

        api.fetch('products', {});

    }

    /**
     * Setup
     */
    private setup() {

        var progress = {
            maxValue: cache.get('products', []).length,
            value: this.user.codes.length
        };

        this.set('username', this.user.username);
        this.set('email', this.user.email);
        this.set('progress_text', progress.value + ' of ' + progress.maxValue);
        this.progress.maxValue = progress.maxValue;
        this.progress.value = progress.value;

        var progress_container = this.page.getViewById('progress_container');
        progress_container.addChild(this.progress);

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

}

