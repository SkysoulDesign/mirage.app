import {Localizator} from "../../Classes/Localizator";
import {Cache as cache} from "../../Classes/Cache";
import {Navigator as navigate} from "../../Classes/Navigator";
import {Api as api} from "../../Classes/Api";
import {Observable} from "data/observable";
import {ApiUserInterface, ApiProductInterface} from "../../Interfaces/ApiUserInterface";
import {except} from "../../Modules/Helpers";
import {openUrl} from "utils/utils";
import {Page} from "ui/page";

let page;

export class RegisterModel extends Observable {

    /**
     * Constructor
     */
    constructor(pageObject:Page) {

        super();

        page = pageObject;

        /**
         * Localize this model
         */
        Localizator.localize(this, [
            'USERNAME', 'REGISTER', 'PASSWORD', 'PASSWORD_CONFIRM', 'EMAIL', 'TERMS'
        ]);

    }

    /**
     * Tap Okay
     */
    public tapRegister() {

        /**
         * Start Loader
         */
        this.set('isLoading', true);

        let registerButton = page.getViewById('register_btn');
            registerButton.isEnabled = false;

        let self = this, request = {
            username: this.get('username'),
            password: this.get('password'),
            password_confirmation: this.get('password_confirmation'),
            email: this.get('email')
        };

        console.dir(request);

        /**
         * Fetch
         */
        api.fetch('register', request, (user:ApiUserInterface) => {

            /**
             * Cache the Data to the user info
             */
            cache.set('api-token', user.api_token);
            cache.set('codes', user.codes);
            cache.set('user', except(user, ['api_token', 'codes']));

            console.log('success');
            console.dir(user);

            /**
             * Fetch all Products in the server
             */
            api.fetch('products', {}, (products:ApiProductInterface) => {

                console.dir(products);

                console.log('finished products');

                navigate.to("main-page", {
                    clearHistory: true
                });

            }, function(error){
                console.log('error');
                console.dir(error);
            });

        }, error => {

            self.set('isLoading', false);
            registerButton.isEnabled = true;

            api.alertErrors(error);

        }, false);

    }

    /**
     * Toggle Terms
     */
    public tapAgreement() {
        openUrl("http://www.soapstudio.com/terms-and-conditions");
    }

}