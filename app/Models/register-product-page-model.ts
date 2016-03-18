import {Observable, EventData} from "data/observable";
import {navigate, api, cache, file} from "../Modules/Helpers";
import {Frame} from "ui/frame";
import {Button} from "ui/button";
import {TextField} from "ui/text-field";
import {ImageSource} from "image-source";
import {BaseModel} from "./BaseModel";
import {Page} from "ui/page";
import dialogs = require("ui/dialogs");

export class RegisterProductPageModel extends BaseModel {

    private page:Page;
    private image:ImageSource;
    private input:TextField;
    private registerButton:Button;
    private invalidMessage:string = 'Invalid Code';

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

        /**
         * Disable Button by Default
         */
        _this.disableButton();

        var data = {
                product_id: null,
                encode_image: true
            },
            onCached = function (img) {
                _this.image.imageSource = img.imageSource;
                //_this.tapRegister();
            },
            onSuccess = function (data) {
                _this.set('isLoading', false);
                _this.set('product_image', data.image.encoded);
                //_this.tapRegister();
            },
            onError = function (errors) {
                console.log('Ooops Error', errors);
                _this.set('isLoading', false);
                _this.disableButton();
                alert(_this.invalidMessage);
            };

        this.on(TextField.propertyChangeEvent, function (args) {

            var value = args.value.toString(),
                length = args.value.toString().length;

            var index = value.indexOf('-') === -1;

            if ((length != 17 && index) || (length != 20 && !index))
                return _this.disableButton();

            /**
             * Enable Button
             * @type {boolean}
             */
            _this.enableButton();

            /**
             * Disable Rechecks
             */
            _this.set('isLoading', true);

            data.product_id = value.substr(0, 5);

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

        });

    }

    /**
     * Navigate to Account
     */
    public tapRegister() {

        var _this = this;
            _this.disableButton();

        var code = this.get('code'),
            length = this.get('code').length

        var index = this.get('code').indexOf('-') === -1;

        if ((length != 17 && index) || (length != 20 && !index)) {
            console.log('invalid');
            return dialogs.confirm(_this.invalidMessage).then(result => {
                _this.disableButton();
            });

        }

        /**
         * Parse Code
         * @type {string}
         */
            //var code = this.get('code').slice(0, 5) + '-' + this.get('code').slice(5, 17).replace(/(.{4})/g, "$1-").slice(0, -1);

        var final = code.replace(/-/g, '');

        console.log(final);

        var data = {code: final},
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
                    _this.enableButton();
                });

            };

        this.set('isLoading', true);

        api.fetch('registerProduct', data, onSuccess, onError, false);

    }

    public enableButton() {
        this.registerButton.isUserInteractionEnabled = true;
        this.registerButton.isEnabled = true;
        this.registerButton.className = 'enabled';
    }

    public disableButton() {
        this.registerButton.isUserInteractionEnabled = false;
        this.registerButton.isEnabled = false;
        this.registerButton.className = 'disabled';
    }

}