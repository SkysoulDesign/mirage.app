import {SignInPageModel} from "../../Models/sign-in-page-model";
import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";
import application = require("application");

export function pageNavigatedTo(args:NavigatedData) {

    if (args.isBackNavigation)
        return;

    var page = <Page>args.object,
        model = new SignInPageModel(),
        loginButton = page.getViewById('login_button');

    page.bindingContext = model.init({
        page: page,
        loginButton: loginButton
    });

}

