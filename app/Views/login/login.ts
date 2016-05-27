import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";
import {LoginModel} from "./login-model";

var model = new LoginModel();

/**
 * Page Loaded
 * @param args
 */
export function loaded(args:NavigatedData) {

    var page = <Page>args.object;
        page.bindingContext = model;

}
