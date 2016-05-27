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

/**
 * NavigateTo
 * @param args
 */
export function navigatedTo(args:NavigatedData) {
    // page = <Page>args.object;
    // console.log('on navigate To');
    // console.dir(page, page.navigationContext);

    // /**
    //  * Clean up orientation
    //  */
    // orientationModule.orientationCleanup();
    //
    // if (args.isBackNavigation)
    //     return;

    // model.bind(page.navigationContext);

}

// export function pageNavigatedFrom() {
//     orientationModule.orientationCleanup();
// }
