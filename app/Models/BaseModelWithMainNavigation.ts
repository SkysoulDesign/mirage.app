import {BaseModel} from "./BaseModel";
import {navigate, general, cache} from "../Modules/Helpers";
import {openUrl} from  "utils/utils" ;
import {topmost} from "ui/frame";
import {ApiCodesInterface, ApiUserInterface} from "../Interfaces/ApiUserInterface";

export class BaseModelWithMainNavigation extends BaseModel {

    /**
     * Initialize defaults screen names
     */
    constructor() {

        super();

        var user:ApiUserInterface = cache.get('login');

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
     * Use getAddProductAction from General Helper
     */
    public tapAddProduct() {
        general.getAddProductAction();
    }

    /**
     * Open Menu
     */
    public tapOpenMenu() {

        var sideDrawer = topmost().getViewById("sideDrawer");
            sideDrawer.toggleDrawerState();

    }

    /**
     * Open Camera to soap
     */
    public tapProduct(code:ApiCodesInterface) {
        navigate.to('product-main-page', {context: code});
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
        navigate.to("settings");
    };

}