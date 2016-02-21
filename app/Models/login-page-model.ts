import {Observable} from "data/observable";
import {Mirage as App} from "../app";

export class LoginModel extends Observable {

    /**
     * Register Button
     */
    public tapRegister() {

        var navigationEntry = {
            backstackVisible: true
        };

        App.navigate.to('register', navigationEntry);

    }

    /**
     * Login Button
     */
    public tapSignIn() {
        App.navigate.to('sign-in');
    }

}

