import {ProductMainPageModel} from "../../Models/product-main-page-model";
import {Page} from 'ui/page';
import {StackLayout} from "ui/layouts/stack-layout";
import orientationModule = require("nativescript-screen-orientation");
import {cache, navigate} from "../../Modules/Helpers";
import {ApiUserInterface} from "../../Interfaces/ApiUserInterface";
import {GridLayout} from "ui/layouts/grid-layout";
import {ApiUrlInterface} from "../../Interfaces/ApiUrlInterface";
import {observable} from "ui/core/view";

var model = new ProductMainPageModel();

export function pageNavigatedTo(args:observable.EventData) {

    var page = <Page>args.object,
        context = page.navigationContext.url,
        user:ApiUserInterface = cache.get('login');

    for (var index in user.codes) {
        if (user.codes[index].product.code === context.name) {
            var codes = user.codes[index];
        }
    }

    page.bindingContext = model.initOnce({
        page: page,
        codes: codes,
        context: context
    });

    model.refresh();
    console.dir(model);

}

export function pageNavigatingTo(){

}

export function pageNavigatedFrom() {
    console.log('im navigating from');
    //orientationModule.orientationCleanup();
    //navigate.to('main-page');
    //navigate.to('main-page');
}