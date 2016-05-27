import {Page} from 'ui/page';
import {Navigator as navigate} from "../../Classes/Navigator";
import {NavigatedData} from "ui/page";
import {RegisterProductModel} from "./register-product-model";

let page:Page, figure, registerButton;

/**
 * Page Loaded
 * @param args
 */
export function loaded(args:NavigatedData) {

    page = <Page>args.object;
    page.bindingContext = new RegisterProductModel(page);

}

/**
 * NavigatedTo
 * @param args
 */
export function navigatedTo(args:NavigatedData) {

    if (!args.isBackNavigation && !page.navigationContext)
        return navigate.to('scanner-page');

    console.log("Context from scanner");

    page.bindingContext.set('code', page.navigationContext);

    /**
     * Init Needed Components
     */
    // model.initComponents(figure, registerButton);

    /**
     * Set Page context as product code in case it is coming from the scanner
     */
    // model.set('code', );

}

