import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";
import {ProductMainPageModel} from "./product-main-page-model";

let page:Page;

/**
 * Page loaded
 */
export function loaded(args:NavigatedData) {

    page = <Page>args.object;
    page.bindingContext = new ProductMainPageModel(page, page.navigationContext);

}