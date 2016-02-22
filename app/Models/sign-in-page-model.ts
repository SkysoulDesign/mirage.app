import {Observable} from "data/observable";
import {Mirage as App} from "../app";
import http = require("http");
import {cache} from "../Modules/Helpers";

export class SignInPageModel extends Observable {

    public tapSignIn() {

        /**
         * Set Loader Spinner
         */
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

    }

}