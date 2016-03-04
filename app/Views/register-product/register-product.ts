import {Observable} from "data/observable";
import {Page} from 'ui/page';
import vmModule = require("../../Models/register-product-page-model");
import {RegisterProductPageModel} from "../../Models/register-product-page-model";

export function pageLoaded(args) {

    var page = <Page>args.object,
        input = page.getViewById('code_input'),
        registerButton = page.getViewById('register_button');

    var model = new RegisterProductPageModel();

    page.bindingContext = model.init({page: page, input: input, registerButton: registerButton});

}