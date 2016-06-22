import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";
import {Cache as cache} from '../../Classes/Cache';
import {Navigator as navigate} from '../../Classes/Navigator';
import dialogs = require("ui/dialogs");
import application = require("application");
import orientationModule = require("nativescript-screen-orientation");
import {Localizator} from "../../Classes/Localizator";
import {MainPageModel} from "./main-page-model";
import {Api as api} from "../../Classes/Api";
import {Mirage as App} from "../../app";
import {ApiUserInterface} from "../../Interfaces/ApiUserInterface";

let page:Page;


/**
 * On Page Loaded
 */
export function loaded(args:NavigatedData) {

    /**
     * if Token is NOT set, Redirect to Main-Page
     */
    if (!cache.has('api-token'))
        return navigate.to("login", {clearHistory: true});

}

/**
 * On Page Loaded
 */
export function navigatedTo(args:NavigatedData) {

    // if (cache.get('codes', []).length === 0)
    //     return dialogs.confirm({
    //         title: Localizator.get("ATTENTION"),
    //         message: Localizator.get("NO_PRODUCTS"),
    //         cancelButtonText: "okay, guide me through"
    //     }).then(result => {
    //         navigate.to('register-product');
    //     });

    page = <Page>args.object;
    page.bindingContext = new MainPageModel(page);

    /**
     * Refresh Session Data
     */
    api.refresh(function (data:ApiUserInterface) {

        let codes = cache.get('codes', []);
        
        if (application.ios)
            App.iWatch.sendMessage({
                products: codes
            });
    });

}
