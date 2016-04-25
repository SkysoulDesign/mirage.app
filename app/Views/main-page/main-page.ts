import {MainPageModel} from "../../Models/main-page-model";
import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";
import {cache, api, navigate, general} from "../../Modules/Helpers";
import dialogs = require("ui/dialogs");
import application = require('application');
import orientationModule = require("nativescript-screen-orientation");

export function pageNavigatedFrom() {
    orientationModule.orientationCleanup();
}

export function pageNavigatedTo(args:NavigatedData) {

    orientationModule.setCurrentOrientation("portrait", function () {

        console.log('page reset to portrait');

        if (args.isBackNavigation)
            return;

        /**
         * if Token is NOT set, Redirect to Main-Page
         */
        if (!cache.has('login'))
            return navigate.to("login", {clearHistory: true});

        var mainPageModel = new MainPageModel(),
            page = <Page>args.object;
            page.bindingContext = mainPageModel.init({page: page});

        if (cache.has('login') && cache.get('login').codes.length === 0)
            dialogs.confirm({
                title: "Attention",
                message: "You currently don't have any registered product, please add one to start using the app.",
                cancelButtonText: "okay, guide me through"
            }).then(result => {
                navigate.to('register-product');
            });

        /**
         * Check if User Token is Valid.
         * Otherwise redirect user to login page
         * Use Http.request
         */
        general.refreshCache(data => {
            api.fetch('products', {});
        });
        
    })

}