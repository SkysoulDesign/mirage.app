import {Observable, EventData} from "data/observable";
import {navigate, api, cache} from "../Modules/Helpers";
import textFieldModule = require("ui/text-field");
import {Frame} from "ui/frame";
import {Button} from "ui/button";
import {TextField} from "ui/text-field";

export class RegisterProductPageModel extends Observable {


    /**
     * Constructor
     */
    public constructor(input:TextField, button:Button) {
        super();
        this.getProductInfo(input, button);
    }

    /**
     * getProductInfo
     *
     */
    public getProductInfo(input:TextField, button:Button) {

        var _this = this;

        var data = {
                product_id: null,
                encode_image: true
            },
            onSuccess = function (data) {
                _this.set('isLoading', false);
                _this.set('product_image', data.image.encoded);
            },
            onError = function (errors) {
                console.log('errado');
                _this.set('isLoading', false);
                input.editable = true;
            };

        this.on(textFieldModule.TextField.propertyChangeEvent, function (args:EventData) {

            var length = args.value.toString().length,
                value = args.value.toString();

            if (length >= 18) {
                return _this.set('code_text', 'Invalid Code');
            }

            if (length == 17) {

                input.editable = false;

                /**
                 * Disable Rechecks
                 */
                _this.set('isLoading', true);

                data.product_id = value.substr(0, 5);

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

        if (this.get('code') === undefined || !this.get('code') || this.get('code').length != 17)
            return alert('Invalid Code');

        var code = this.get('code').slice(0, 5) + '-' + this.get('code').slice(5, 17).replace(/(.{4})/g, "$1-").slice(0, -1);

        var _this = this, data = {code: code},
            onSuccess = function () {
                navigate.to("register-success");
            },
            onError = function (e) {
                alert('Invalid Code');
            };

        api.fetch('registerProduct', data, onSuccess, onError, false);

    }

}