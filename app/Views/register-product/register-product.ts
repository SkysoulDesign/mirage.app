import {Observable} from "data/observable";
import {Page} from 'ui/page';
import vmModule = require("../../Models/register-product-page-model");

export function pageLoaded(args){

	var page = <Page>args.object;
	var input = page.getViewById('code_input');
	var button = page.getViewById('button_register');

	page.bindingContext = new vmModule.RegisterProductPageModel(input,button);

}