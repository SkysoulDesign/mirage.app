import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";
import {SignInPageModel} from "./sign-in-model";

let page:Page,
    model = new SignInPageModel();

export function loaded(args:NavigatedData) {
    page = <Page>args.object;
    page.bindingContext = model
}

