import {Observable} from "data/observable";
import dialogs = require("ui/dialogs");
import {Localizator} from "../../Classes/Localizator";
import {Navigator as navigate} from "../../Classes/Navigator";
import {Cache as cache} from "../../Classes/Cache";
import {Api as api} from "../../Classes/Api";
import {topmost} from "ui/frame";
import {ApiUrlInterface} from "../../Interfaces/ApiUrlInterface";
import {except} from "../../Modules/Helpers";
import {ApiUserInterface} from "../../Interfaces/ApiUserInterface";

/**
 * Sign inPage Model
 */
export class SignInPageModel extends Observable {

    /**
     * Constructor
     */
    constructor() {

        super();

        Localizator.localize(this,
            ['USER_OR_EMAIL', 'PASSWORD', 'LOGIN']
        )

    }

    /**
     * Sing in Page
     */
    public tapSignIn() {

        /**
         * Set Loader Spinner
         */
        this.set('isLoading', true);

        let loginButton = topmost().currentPage.getViewById("login_button");
            loginButton.isEnabled = false;

        var self = this, request = {
                credential: this.get('username'),
                password: this.get('password')
            },

            onSuccess = function (user:ApiUserInterface) {

                /**
                 * Cache the Data to the user info
                 */
                cache.set('api-token', user.api_token);
                cache.set('codes', user.codes);
                cache.set('user', except(user, ['api_token', 'codes']));

                /**
                 * Before sing in ensure has all necessary data
                 */
                api.fetch('products', {}, function () {
                    self.set('isLoading', false);
                    navigate.to('main-page', {clearHistory: true});
                });

            },

            onError = function (errors) {

                console.log('error login in', errors);

                self.set('isLoading', false);

                loginButton.isEnabled = true;

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

                        });

                    });
                }

                api.alertErrors(errors);

            };

        api.fetch('login', request, onSuccess, onError, false);

    }

}