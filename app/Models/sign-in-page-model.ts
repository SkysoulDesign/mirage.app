import {Observable} from "data/observable";
import {navigate, api} from "../Modules/Helpers";
import {BaseModel} from "./BaseModel";
import {Button} from "ui/button";
import {Page} from "ui/page";
import dialogs = require("ui/dialogs");
import {LocalizedModel} from "./LocalizedModel";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";

export class SignInPageModel extends LocalizedModel implements LocalizedModelInterface {

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
     * Localize Model
     * @returns {string[]}
     */
    public localize() {
        return ['USER_OR_EMAIL', 'PASSWORD', 'LOGIN'];
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

                if (errors === 'invalid_username_or_password') {

                    return dialogs.confirm({
                        title: "Error",
                        message: "Invalid Username or Password",
                        cancelButtonText: "Reset Password",
                        okButtonText: "Try Again"
                    }).then(result => {

                        /**
                         * Reset Password
                         */
                        if (!result) dialogs.prompt({
                            title: "Reset Password",
                            message: "Please input your username or email",
                            okButtonText: "Reset",
                            cancelButtonText: "Cancel",
                            inputType: dialogs.inputType.text
                        }).then(r => {

                            /**
                             * if Reset Password
                             */
                            if (r.result) api.fetch('resetPassword', {credential: r.text}, response => {
                                dialogs.alert(response.status);
                            }, error => {
                                api.alertErrors(error);
                            }, false);

                            //console.log("Dialog result: " + r.result + ", text: " + r.text);

                        });

                    });
                }

                api.alertErrors(errors);

            };

        api.fetch('login', data, onSuccess, onError);

    }

}