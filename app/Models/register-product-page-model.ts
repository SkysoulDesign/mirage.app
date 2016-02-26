import {Observable, EventData} from "data/observable";
import {navigate, api, cache} from "../Modules/Helpers";
import {getViewById} from "ui/core/view";
import textFieldModule = require("ui/text-field");

export class RegisterProductPageModel extends Observable {

    /**
     * Constructor
     */
    public constructor(str) {
        super();
        this.getProductInfo(str);
    }

    /**
     * getProductInfo
     *
     */
    public getProductInfo(str) {

        var _this = this,
            input = getViewById('code_input');

        var data = {
                product_id: null,
                encode_image: true
            },
            onSuccess = function (data) {
                _this.set('isLoading', false);
            },
            onError = function (errors) {
                api.alertErrors(errors);
                _this.set('isLoading', false);
            };

        _this.set('code', 'test');

        this.on(textFieldModule.TextField.propertyChangeEvent, function (args:EventData) {

            console.log(args.value.length);
            console.log(args.value.toString());

            _this.set('code', 'hey man');

            if (args.value.toString().length >= 17) {

                return _this.set('code', args.value.toString().slice(0, -1));
            }

            if (args.value.length >= 5 && _this.get('started')) {

                /**
                 * Disable Rechecks
                 */
                this.set('isLoading', true);
                _this.set('started', true);

                data.product_id = args.value.substr(0, 5);
                console.log(data.product_id);

                var result = api.fetch('product', data, onSuccess, onError, true);

                result.on(Observable.propertyChangeEvent, function (data:EventData) {
                    _this.set('product_image', result.get('data').image.encoded);
                });

            }

        });

    }

    /**
     * Navigate to Account
     */
    public tapRegister() {
        navigate.to("register-success");
    }

}