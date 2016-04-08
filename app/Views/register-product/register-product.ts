import {Page} from 'ui/page';
import {RegisterProductPageModel} from "../../Models/register-product-page-model";
import {navigate} from "../../Modules/Helpers";
import {NavigatedData} from "ui/page";

export function pageNavigatedTo(args:NavigatedData) {

    var page = <Page>args.object;

    if (!args.isBackNavigation && !page.navigationContext)
        return navigate.to('scanner-page');

    var model = new RegisterProductPageModel(),
        input = page.getViewById('code_input'),
        image = page.getViewById('figure'),
        registerButton = page.getViewById('register_button');

    page.bindingContext = model.init({
        page: page,
        input: input,
        registerButton: registerButton,
        image: image,
        scannedCode: page.navigationContext
    });

}