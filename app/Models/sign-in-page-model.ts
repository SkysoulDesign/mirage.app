import {Observable} from "data/observable";
import http = require("http");
import {navigate, api, cache} from "../Modules/Helpers";

export class SignInPageModel extends Observable {

    /**
     * Sing in Page
     */
    public tapSignIn() {

        /**
         * Set Loader Spinner
         */
        this.set('isLoading', true);

        var _this = this, data = {
                credential: this.get('username'),
                password: this.get('password')
            },

            onSuccess = function () {
                _this.set('isLoading', false);
                navigate.to('main-page', {clearHistory: true});
            },

            onError = function (errors) {
                _this.set('isLoading', false);
                api.alertErrors(errors);
            };

        api.fetch('login', data, onSuccess, onError);

    }

}