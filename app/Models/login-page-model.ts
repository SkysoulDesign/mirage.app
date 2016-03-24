import {Observable} from "data/observable";
import {navigate} from "../Modules/Helpers";
import {topmost} from "ui/frame";
import {view} from "../Modules/Helpers";

export class LoginModel extends Observable {

    /**
     * Constructor
     */
    constructor() {
        super()
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
        topmost().navigate(view('sign-in'));
    }

}

