import {BaseModel} from "./BaseModel";
import {navigate} from "../Modules/Helpers";
import {ApiUrlInterface} from "../Interfaces/ApiUrlInterface";
import OpenUrl = require( "nativescript-openurl" );
import {topmost} from "ui/frame";

export class BaseModelWithMainNavigation extends BaseModel {

    /**
     * Open Camera to Scan QRCode
     */
    public tapScanQRCode() {
        navigate.to('scanner-page');
    }

    /**
     * Open Register Product
     */
    public tapRegisterProduct() {
        navigate.to('register-product');
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
    public tapProduct(url:ApiUrlInterface) {
        navigate.to('product-main-page', {context: {url: url}});
    };

    /**
     * Open Camera to soap
     */
    public tapSoap() {
        OpenUrl("http://www.soapstudio.com");
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