import {openUrl} from  "utils/utils" ;
import {topmost} from "ui/frame";
import {Observable} from "data/observable";
import {ApiUserInterface, ApiCodesInterface} from "../Interfaces/ApiUserInterface";
import {Navigator as navigate} from "../Classes/Navigator";
import {Cache as cache} from "../Classes/Cache";
import {RadSideDrawer} from "nativescript-telerik-ui/sidedrawer/index";

/**
 * Base Model
 */
export class BaseModelWithMainNavigation extends Observable {

    /**
     * Initialize defaults screen names
     */
    constructor() {

        super();

        var user = <ApiUserInterface>cache.get('user', {});

        this.set('username', user.username);
        this.set('email', user.email);

    }

    /**
     * Open Camera to Scan QRCode
     */
    public tapScanQRCode() {
        navigate.to('register-product');
    }

    /**
     * Open Register Product
     */
    public tapRegisterProduct() {
        navigate.to('register-product');
    }

    /**
     * Open Navigate Search
     */
    public tapSearch() {
        navigate.to('search');
    }

    /**
     * Open Menu
     */
    public tapOpenMenu() {

        let sideDrawer = <RadSideDrawer>topmost().getViewById("sideDrawer");
            sideDrawer.toggleDrawerState();

    }

    /**
     * Open Camera to soap
     */
    public tapProduct(code:ApiCodesInterface) {
        navigate.to('product-main-page', {context: code, backstackVisible: false});
    };

    /**
     * Open Camera to soap
     */
    public tapSoap() {
        openUrl("http://www.soapstudio.com");
    };

    /**
     * Open Camera to new
     */
    public tapNews() {
        //navigate.to("mirage-news");
    };

    /**
     * Open Camera to settings
     */
    public tapSetting() {
        navigate.to("settings", {
            backstackVisible:false
        });
    };

}