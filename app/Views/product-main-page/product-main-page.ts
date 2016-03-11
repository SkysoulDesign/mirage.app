import {ProductMainPageModel} from "../../Models/product-main-page-model";
import {Page} from 'ui/page';
import {StackLayout} from "ui/layouts/stack-layout";
import orientationModule = require("nativescript-screen-orientation");
import {cache, navigate} from "../../Modules/Helpers";
import {ApiUserInterface} from "../../Interfaces/ApiUserInterface";
import {NavigatedData} from "ui/page";
import {ApiUrlInterface} from "../../Interfaces/ApiUrlInterface";

export function pageNavigatedTo(args:NavigatedData) {

    /**
     * Clean up orientation
     */
    orientationModule.orientationCleanup();

    if (args.isBackNavigation)
        return;

    var page = <Page>args.object,
        context = <ApiUrlInterface>page.navigationContext.url,
        user = <ApiUserInterface>cache.get('login');

    var model = new ProductMainPageModel();

    for (var index in user.codes) {

        if (user.codes[index].product.image === context.full) {
            var codes = user.codes[index];
        }

    }

    page.bindingContext = model.init({
        page: page,
        codes: codes,
        context: context,
        user: user
    });

}

export function pageNavigatedFrom() {
    orientationModule.orientationCleanup();
}