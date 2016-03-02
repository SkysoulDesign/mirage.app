import vmModule = require("../../Models/product-main-page-model");
import {Page} from 'ui/page';
import {StackLayout} from "ui/layouts/stack-layout";
import orientationModule = require("nativescript-screen-orientation");
import {cache} from "../../Modules/Helpers";

export function pageLoaded(args) {

    /**
     * Fix Orientation
     */
        //orientationModule.setCurrentOrientation("portrait");
    orientationModule.orientationCleanup();

    var page = <Page>args.object,
        container = <StackLayout>page.getViewById('extras_container'),
        user = cache.get('login'),
        product = null;

    for (var product in user.codes) {
        if (user.codes[product].product.code === page.navigationContext.code) {
            var product = user.codes[product].product;
        }
    }

    console.dir(product);

    if (!product) {
        alert('product not found');
        return;
    }

    page.bindingContext = new vmModule.ProductMainPageModel(container, product);

}

export function pageUnloaded() {
    orientationModule.orientationCleanup();
}