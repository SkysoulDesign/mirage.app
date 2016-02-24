import {Observable, EventData} from "data/observable";
import {navigate, api} from "../Modules/Helpers";

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

        var _this = this;

        this.set('text1', str.substr(0, 5));
        this.set('text2', str.substr(6, 5));
        this.set('text3', str.substr(12, 5));
        this.set('text4', str.substr(18, 5));

        _this.set('isLoading', true);

        var data = {
                product_id: _this.get("text1"),
                encode_image: true
            },
            onSuccess = function (data) {
                _this.set('isLoading', false);
            },
            onError = function (errors) {
                api.alertErrors(errors);
                _this.set('isLoading', false);
            };

        var result = api.fetch('product', data, onSuccess, onError);

        result.on(Observable.propertyChangeEvent, function (data:EventData) {
            _this.set('product-image', result.get('data').image.encoded);
        });

    }

    /**
     * Navigate to Account
     */
    public tapRegister() {
        navigate.to("register-success");
    }

}