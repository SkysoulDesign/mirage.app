import {LoginModel} from "../../Models/login-page-model";
import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";

export function pageNavigatedTo(args:NavigatedData) {

    if (args.isBackNavigation)
        return;

    var page = <Page>args.object;
        page.bindingContext = new LoginModel();

}
