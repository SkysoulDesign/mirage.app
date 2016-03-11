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
    private input:TextField;
    private registerButton:Button;

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

        var _this = this,
            image = this.page.getViewById('figure');

        var data = {
                product_id: null,
                encode_image: true
            },
            onCached = function (img) {
                image.imageSource = img.imageSource;
            },
            onSuccess = function (data) {
                _this.set('isLoading', false);
                _this.set('product_image', data.image.encoded);
            },
            onError = function (errors) {
                _this.set('isLoading', false);
                _this.input.text = '';
                //_this.input.editable = true;
            };

        this.on(TextField.propertyChangeEvent, function (args:EventData) {

            var length = args.value.toString().length,
                value = args.value.toString();

            if (length >= 18)
                return _this.set('code_text', 'Invalid Code');

            if (length == 17) {

                _this.set('code_text', 'Valid Code');

                //_this.input.editable = false;

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

            }

        });

    }

    /**
     * Navigate to Account
     */
    public tapRegister() {

        this.registerButton.isEnabled = false;

        if (this.get('code') === undefined || !this.get('code') || this.get('code').length != 17) {
            this.registerButton.isEnabled = true;
            return alert('Invalid Code');
        }

        var code = this.get('code').slice(0, 5) + '-' + this.get('code').slice(5, 17).replace(/(.{4})/g, "$1-").slice(0, -1);

        var _this = this, data = {code: code},
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
                alert('Invalid Code');
                _this.input.text = '';
                _this.input.isEnabled = true;
                _this.set('isLoading', false);
                _this.registerButton.isEnabled = false;
            };

        this.set('isLoading', true);

        api.fetch('registerProduct', data, onSuccess, onError, false);

    }

}