import {ProductMainPageModel} from "../../Models/product-main-page-model";
import {Page} from 'ui/page';
import {StackLayout} from "ui/layouts/stack-layout";
import orientationModule = require("nativescript-screen-orientation");
import {cache, navigate} from "../../Modules/Helpers";
import {ApiUserInterface} from "../../Interfaces/ApiUserInterface";
import {NavigatedData} from "ui/page";
import {ApiUrlInterface} from "../../Interfaces/ApiUrlInterface";
import {ApiCodesInterface} from "../../Interfaces/ApiUserInterface";

export function pageNavigatedTo(args:NavigatedData) {

    /**
     * Clean up orientation
     */
    orientationModule.orientationCleanup();

    if (args.isBackNavigation)
        return;

    var page = <Page>args.object,
        codes = <ApiCodesInterface>page.navigationContext,
        model = new ProductMainPageModel();

    page.bindingContext = model.init({
        page: page,
        codes: codes
    });

}

export function pageNavigatedFrom() {
    orientationModule.orientationCleanup();
}