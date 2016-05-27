import {Observable} from "data/observable";
import {Localizator} from "../../Classes/Localizator";
import {Navigator as navigate} from "../../Classes/Navigator";

export class LoginModel extends Observable {

    /**
     * Constructor
     */
    constructor() {

        super();

        /**
         * Localize this model
         */
        Localizator.localize(this, [
            'LOGIN', 'REGISTER'
        ]);

    }

    /**
     * Register Button
     */
    public tapRegister() {
        navigate.to('register');
    }

    /**
     * Login Button
     */
    public tapSignIn() {
        navigate.to('sign-in');
    }

}

