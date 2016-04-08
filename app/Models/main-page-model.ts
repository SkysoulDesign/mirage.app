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
import {Page} from "ui/page";
import application = require('application')
import {BaseModel} from "./BaseModel";
import progressModule = require("ui/progress");
import {StackLayout} from "ui/layouts/stack-layout";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";
import {LocalizedModelWithNavigation} from "./LocalizedModelWithNavigation";
import {ApiProductInterface} from "../Interfaces/ApiUserInterface";
import {ApiCodesInterface} from "../Interfaces/ApiUserInterface";

export class MainPageModel extends LocalizedModelWithNavigation implements LocalizedModelInterface {

    private page:Page;
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
     * Setup
     */
    private setup() {

        var user:ApiUserInterface = cache.get('login'),
            progress = {
                maxValue: cache.get('products', []).length,
                value: user.codes.length
            };

        this.set('progress_text', progress.value + ' of ' + progress.maxValue);
        this.progress.maxValue = progress.maxValue;
        this.progress.value = progress.value;

        var progress_container = this.page.getViewById('progress_container');
        progress_container.addChild(this.progress);

        var container = <StackLayout>this.get('page').getViewById("product_layout");

        for (var x in user.codes) {

            var image = this.createImage(user.codes[x]);

            image.cssClass = isEven(x) ? 'background-statue' : 'foreground-statue';

            container.addChild(image);

        }

    }

    /**
     * Localize Model
     * @returns {string[]}
     */
    public localize() {
        return ['SETTING', 'ABOUT_SOAP', 'NEWS', 'MY_COLLECTION', 'MAIN_PAGE_TITLE'];
    }

    private createImage(code:ApiCodesInterface):ImageModule.Image {

        var _this = this,
            image = new ImageModule.Image(),
            url = parseURL(code.product.image);

        api.fetchImage(api.getBase() + url.full, function (imageSource) {
            image.imageSource = imageSource;
        });

        image.on(GestureTypes.tap, function () {
            _this.tapProduct(code);
        });

        return image;

    }

}

