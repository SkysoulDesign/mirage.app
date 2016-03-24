import {LoginModel} from "../../Models/login-page-model";
import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";

export function pageNavigatedTo(args:NavigatedData) {

    if (args.isBackNavigation)
        return;

    var model = new LoginModel();

    var page = <Page>args.object;
        page.bindingContext = model.init({page:page});

}
