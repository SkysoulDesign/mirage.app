import {Observable} from "data/observable";
import {cache} from "../Modules/Helpers";
import {topmost} from "ui/frame";
import {ApiUserInterface} from "../Interfaces/ApiUserInterface";

export class ProductMainPageModel extends Observable {

    /**
     * Constructor
     */
    constructor() {

        super();

        /**
         * Set Defaults
         */
        var user:ApiUserInterface = cache.get('login');

        this.set('username', user.username);
        this.set('email', user.email);

    }

    /**
     * Open Menu
     */
    public tapOpenMenu() {

        var sideDrawer = topmost().getViewById("sideDrawer");
        sideDrawer.toggleDrawerState();

    }

}