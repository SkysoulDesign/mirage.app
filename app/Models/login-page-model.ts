import {Observable} from "data/observable";
import {Mirage as App} from "../app";
import {navigate} from "../Modules/Helpers";

export class LoginModel extends Observable {

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

