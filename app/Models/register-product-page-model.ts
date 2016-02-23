import {Observable} from "data/observable";
import {Mirage as App} from "../app";

export class RegisterproductPageModel extends Observable {

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
    public getProductInfo(str){
        var _this = this;
        this.set('text1', str.substr(0, 5));
        this.set('text2', str.substr(6, 5));
        this.set('text3', str.substr(12, 5));
        this.set('text4', str.substr(18, 5));
        var data = {
            product_id: _this.get("text1")
        },
            onSuccess = function(data) {
                App.navigate.to('registersuccess');
                _this.set('isLoading', false);
                var url = App.api.get('product') + '/' + data.get('image');
                console.log(url);
                this.set('productimage', url);
            },
            onError = function(errors) {
                App.api.alertErrors(errors);
                _this.set('isLoading', false);
            };
        var result = App.api.fetch('product', data, onSuccess, onError);
        // this.set('productimage', App.api.get('product') + '/' + result.get('image'));
        console.dir("getproduct  " + result.get('image'));
    }

    /**
     * Navigate to Account
     */
    public tapRegister() {
        App.navigate.to("register-success");
    }

}