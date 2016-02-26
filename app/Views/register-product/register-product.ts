import {Observable} from "data/observable";
import {Page} from 'ui/page';
import vmModule = require("../../Models/register-product-page-model");

export function pageLoaded(args){

	var page = <Page>args.object;
	var str = page.navigationContext;

	page.bindingContext = new vmModule.RegisterProductPageModel(str);

}