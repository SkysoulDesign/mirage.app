import {Page} from 'ui/page';
import {RegisterModel} from "./register-model";
import {NavigatedData} from "ui/page";

/**
 * Page Loaded
 * @param args
 */
export function loaded(args:NavigatedData) {

    let page = <Page>args.object;
        page.bindingContext = new RegisterModel(page);

}