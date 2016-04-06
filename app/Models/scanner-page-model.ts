import {navigate, api, cache, file, general} from "../Modules/Helpers";
import {ImageSource} from "image-source";
import {Page} from "ui/page";
import dialogs = require("ui/dialogs");
import {LocalizedModelWithNavigation} from "./LocalizedModelWithNavigation";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";

export class ScannerPageModel extends LocalizedModelWithNavigation implements LocalizedModelInterface {

    private page:Page;
    private image:ImageSource;
    private invalidMessage:string = 'Invalid Code';
    private scannedCode:string;

    /**
     * Constructor
     */
    constructor() {
        super();
    }

    /**
     * Setup page
     */
    public setup() {

        var _this = this;

        var data = {
                product_id: null,
                encode_image: true
            },
            onCached = function (img) {
                _this.image.imageSource = img.imageSource;
                _this.doRegister();
            },
            onSuccess = function (data) {
                _this.set('isLoading', false);
                _this.set('product_image', data.image.encoded);
                _this.doRegister();
            },
            onError = function (errors) {
                alert(_this.invalidMessage);
                navigate.back();
            };

        /**
         * Disable Rechecks
         */
        _this.set('isLoading', true);

        data.product_id = _this.scannedCode.substr(0, 5);

        /**
         * Check if its cached
         */
        if (file.has(data.product_id + '.png')) {
            return onCached(file.load(data.product_id + '.png'));
        }

        /**
         * fetch product
         */
        api.fetch('product', data, onSuccess, onError, true);

        console.log(_this.scannedCode);
        //_this.doRegister();

    }

    /**
     * Localize Model
     * @returns string[]
     */
    public localize() {
        return [];
    }

    /**
     * Do Product Register
     */
    public doRegister() {

        var _this = this,
            code = _this.scannedCode;
        console.log(code);

        if (general.validateCode(code)) {
            return dialogs.confirm(_this.invalidMessage).then(result => {
                _this.redirectPage();
            });
        }

        var data = {code: code.replace(/-/g, '')},
            onSuccess = function () {

                /**
                 * Re-Fetch user info and cache it
                 */
                api.fetch('checkLogin', {}, function (data) {

                    cache.set('login', data);

                    _this.set('isLoading', false);

                    var options = {
                        title: "Success",
                        message: "Product Registered Successfully",
                        okButtonText: "OK"
                    };

                    dialogs.alert(options).then(function () {
                        navigate.to("main-page", {clearHistory: true});
                    });

                }, null, false);

            },
            onError = function (e) {

                dialogs.confirm(_this.invalidMessage).then(result => {
                    _this.set('isLoading', false);
                    _this.redirectPage();
                });

            };

        _this.set('isLoading', true);

        api.fetch('registerProduct', data, onSuccess, onError, false);

    }

    /**
     * Redirect to Default Page
     */
    public redirectPage() {
        navigate.to("main-page");
    }

}