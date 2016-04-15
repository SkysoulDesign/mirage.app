import {EventData} from "data/observable";
import {api, navigate, cache} from "../Modules/Helpers";
import {Button} from "ui/button";
import {Page} from "ui/page";
import {LocalizedModel} from "./LocalizedModel";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";
import OpenUrl = require( "nativescript-openurl" );

export class RegisterPageModel extends LocalizedModel implements LocalizedModelInterface {

    private page:Page;
    private registerButton:Button;

    /**
     * Setup
     */
    public setup() {}

    /**
     * Localize Model
     * @returns string[]
     */
    public localize() {
        return ['USERNAME', 'REGISTER', 'PASSWORD', 'PASSWORD_CONFIRM', 'EMAIL', 'TERMS'];
    }

    /**
     * Tap Okay
     */
    public tapRegister() {

        /**
         * Start Loader
         */
        this.set('isLoading', true);

        this.registerButton.isEnabled = false;

        var _this = this,
            data = {
                username: this.get('username'),
                password: this.get('password'),
                password_confirmation: this.get('password_confirmation'),
                email: this.get('email'),
            };

        var onSuccess = function (data) {

                /**
                 * Cache the Data to the user info
                 */
                cache.set('login', data);
                api.fetch('products', {}, function () {
                    _this.set('isLoading', false);
                    navigate.to("main-page", {clearHistory: true});
                });

            },
            onError = function (e) {
                _this.set('isLoading', false);
                _this.registerButton.isEnabled = true;

                api.alertErrors(e);
            };

        /**
         * Fetch
         */
        api.fetch('register', data, onSuccess, onError)

    }

    /**
     * Set Gender
     * @param event
     */
    public setGender(event:EventData) {
        this.set('gender', event.object.get('id'));
    }

    /**
     * Toggle Terms
     */
    public tapAgreement() {
        OpenUrl("http://www.soapstudio.com/terms-and-conditions");
    }

}