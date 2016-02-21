import {Observable} from "data/observable";
import {Mirage as App} from "../app";
import OpenUrl = require( "nativescript-openurl" );

export class MainPageModel extends Observable {

    public tapProduct() {
        App.navigate.to("product-main-page");
    };

    public tapSoap() {
        OpenUrl("http://www.soapstudio.com");
    };

    public tapNews() {
        App.navigate.to("mirage-news");
    };

    public tapQR() {
        App.navigate.to("scanQR");
    };

    public tapSetting() {
        App.navigate.to("settings");
    };

}

