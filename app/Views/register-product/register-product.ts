import {Observable} from "data/observable";
import {Page} from 'ui/page';
import vmModule = require("../../Models/register-product-page-model");
import {RegisterProductPageModel} from "../../Models/register-product-page-model";
import {navigate} from "../../Modules/Helpers";
import {NavigatedData} from "ui/page";

export function pageNavigatedTo(args) {

    var page = <Page>args.object,
        input = page.getViewById('code_input'),
        image = page.getViewById('figure'),
        registerButton = page.getViewById('register_button');

    var model = new RegisterProductPageModel();

    page.bindingContext = model.init({
        page: page,
        input: input,
        registerButton: registerButton,
        image: image,
        scannedCode: "MF0013D15F9F45C25"
    });

}