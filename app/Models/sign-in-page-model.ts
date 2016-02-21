import {Observable} from "data/observable";
import {Mirage as App} from "../app";
import http = require("http");
import {cache} from "../Modules/Helpers";

export class SignInPageModel extends Observable {

    public tapSignIn() {

        /**
         * Set Loader Spinner
         */
        var _this = this;
        _this.set('isLoading', true);

        http.request({
            url: App.api.get('login').url,
            method: "POST",
            headers: {"Content-Type": "application/json"},
            content: JSON.stringify({
                credential: this.get('username'),
                password: this.get('password')
            })
        }).then(function (response) {

            /**
             * Disable Loader
             */
            _this.set('isLoading', false);

            var result = response.content.toJSON();

            /**
             * Store Token
             */
            if (result.hasOwnProperty('api_token')) {
                cache.set('user', result);
                App.navigate.to('main-page');
            }

            /**
             * Alert Errors
             */
            if (result.hasOwnProperty('error')) {
                App.api.alertErrors(result.error);
            }

        }, function (e) {
            console.log("Error occurred " + e);
        });

    }

}