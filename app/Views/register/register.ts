import {RegisterPageModel} from "../../Models/register-page-model";
import {Page} from 'ui/page';

export function pageLoaded(args) {

    var page = <Page>args.object,
        model = new RegisterPageModel(),
        registerButton = page.getViewById('register_btn');

        page.bindingContext = model.init({
            page: page,
            registerButton: registerButton
        });

}