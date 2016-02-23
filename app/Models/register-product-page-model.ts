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
                product_id: _this.get("text1")
            },
            onSuccess = function (data) {
                _this.set('isLoading', false);
                var url = data.image;
                console.log("-----------------1------------------1");
                console.log(url);
                _this.set('productimage', data.image.encoded);
                // rereturns an interface api.get('product')
                // that in the end means what will return if u find that
                // _this.set('productimage', url); // this here have another contect
            },
            onError = function (errors) {
                api.alertErrors(errors);
                _this.set('isLoading', false);
            };
        var result = api.fetch('product', data, onSuccess, onError);
        console.dir("getproduct  " + result.get('data').image);//here it will be null because fetch still didnt finish

        result.on(Observable.propertyChangeEvent, function (data:EventData) {
            console.log("-----------------2------------------2");
            console.dir(data.object.get('data'));
            _this.set('productimage', result.get('data').image.encoded);
            console.dir(result.get('data').image);
        });

    }

    /**
     * Navigate to Account
     */
    public tapRegister() {
        navigate.to("register-success");
        console.log("register");
    }

}