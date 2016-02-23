import {Observable} from "data/observable";
import {Mirage as App} from "../app";
import http = require("http");
import {cache} from "../Modules/Helpers";

export class SignInPageModel extends Observable {

    public tapSignIn() {

        /**
         * Set Loader Spinner
         */
<<<<<<< HEAD
        var _this = this;
        _this.set('isLoading', true);
        var onSuccess = function() {
            App.navigate.to('main-page');
            _this.set('isLoading', false);
            },
            onError = function(errors) {
                App.api.alertErrors(errors);
                _this.set('isLoading', false);
            },
            data = {
                credential: _this.get('username'),
                password: _this.get('password')
            };
        App.api.fetch('login', data, onSuccess, onError);
        // http.request({
        //     url: App.api.get('login').url,
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     content: JSON.stringify({
        //         credential: this.get('username'),
        //         password: this.get('password')
        //     })
        // }).then(function (response) {

        //     /**
        //      * Disable Loader
        //      */
        //     _this.set('isLoading', false);

        //     var result = response.content.toJSON();

        //     /**
        //      * Store Token
        //      */
        //     if (result.hasOwnProperty('api_token')) {
        //         cache.set('user', result);
        //         App.navigate.to('main-page');
        //     }

        //     /**
        //      * Alert Errors
        //      */
        //     if (result.hasOwnProperty('error')) {
        //         App.api.alertErrors(result.error);
        //     }

        // }, function (e) {
        //     console.log("Error occurred " + e);
        // });
=======
        this.set('isLoading', true);

        var _this = this, data = {
                credential: this.get('username'),
                password:   this.get('password')
            },

            onSuccess = function () {
                _this.set('isLoading', false);
                App.navigate.to('main-page');
            },

            onError = function (errors) {
                _this.set('isLoading', false);
                App.api.alertErrors(errors);
            };

        App.api.fetch('login', data, onSuccess, onError);
>>>>>>> 9ba69f1764a7e5489620bf99c297b7c50c8993c6

    }

}