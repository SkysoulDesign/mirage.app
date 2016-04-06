import {MainPageModel} from "../../Models/main-page-model";
import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";
import {cache} from "../../Modules/Helpers";
import dialogs = require("ui/dialogs");
import {ApiUserInterface} from "../../Interfaces/ApiUserInterface";
import {navigate} from "../../Modules/Helpers";
import application = require('application');
import {Mirage as App} from "../../app" ;

export function pageNavigatedTo(args:NavigatedData) {

    if (args.isBackNavigation)
        return;

    /**
     * if Token is NOT set, Redirect to Main-Page
     */
    if (!cache.has('login'))
        return navigate.to("login", {clearHistory: true});

    var mainPageModel = new MainPageModel(),
        user = cache.get('login');

    var page = <Page>args.object;
    page.bindingContext = mainPageModel.init({page: page, user: user});

    if (user.codes.length === 0)
        dialogs.confirm({
            title: "Attention",
            message: "You currently don't have any registered product, please add one to start using the app.",
            okButtonText: "okay, guide me through",
        }).then(function () {
            navigate.to('register-product');
        });

    /**
     * Check if User Token is Valid.
     * Otherwise redirect user to login page
     * Use Http.request
     */
    mainPageModel.refreshLogin(data => {
        if (application.ios) App.iWatch.sendMessage({products: data.codes});
    });

}