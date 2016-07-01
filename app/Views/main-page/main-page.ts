import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";
import {Cache as cache} from '../../Classes/Cache';
import {Navigator as navigate} from '../../Classes/Navigator';
import dialogs = require("ui/dialogs");
import {MainPageModel} from "./main-page-model";
import {Api as api} from "../../Classes/Api";
import {Mirage as App} from "../../app";
import {ApiUserInterface} from "../../Interfaces/ApiUserInterface";
import {isIOS} from "../../Modules/Helpers";

let page:Page;

export function loaded() {

    if (isIOS()) {
        UIDevice.currentDevice().setValueForKey(
            NSNumber.numberWithInteger(UIInterfaceOrientationPortrait), "orientation"
        );
    }

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

    /**
     * if Token is NOT set, Redirect to Main-Page
     */
    if (!cache.has('api-token'))
        return navigate.to("login", {clearHistory: true});

    page = <Page>args.object;
    page.bindingContext = new MainPageModel(page);

    /**
     * Refresh Session Data
     */
    api.refresh(function (data:ApiUserInterface) {

        let codes = cache.get('codes', []);

        if (isIOS())
            App.iWatch.sendMessage({
                products: codes
            });

    });

}
