import {Observable} from "data/observable";
import {navigate} from "../Modules/Helpers";
import {topmost} from "ui/frame";
import {view} from "../Modules/Helpers";
import {Page} from "ui/page";
import {LocalizedModel} from "./LocalizedModel";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";

export class LoginModel extends LocalizedModel implements LocalizedModelInterface {

    private page:Page;

    /**
     * Constructor
     */
    constructor() {
        super()
    }

    public setup() {
    }

    /**
     * Localize Model
     * @returns {string[]}
     */
    public localize() {
        return ['LOGIN', 'REGISTER'];
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

