import {Observable} from "data/observable";
import {navigate, api} from "../Modules/Helpers";
import {BaseModel} from "./BaseModel";
import {Button} from "ui/button";
import {Page} from "ui/page";

export class SignInPageModel extends BaseModel {

    private page:Page;
    private loginButton:Button;

    /**
     * Constructor
     */
    constructor() {
        super();
    }

    /**
     * Setup
     */
    public setup() {

    }

    /**
     * Sing in Page
     */
    public tapSignIn() {

        /**
         * Set Loader Spinner
         */
        this.set('isLoading', true);

        this.loginButton.isEnabled = false;

        var _this = this, data = {
                credential: this.get('username'),
                password: this.get('password')
            },

            onSuccess = function () {

                /**
                 * Before sing in ensure has all necessary data
                 */
                api.fetch('products', {}, function () {
                    _this.set('isLoading', false);
                    navigate.to('main-page', {clearHistory: true});
                });

            },

            onError = function (errors) {
                _this.set('isLoading', false);
                _this.loginButton.isEnabled = true;
                api.alertErrors(errors);
            };

        api.fetch('login', data, onSuccess, onError);

    }

}