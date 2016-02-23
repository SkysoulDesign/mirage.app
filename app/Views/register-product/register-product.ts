import {Observable} from "data/observable";
import {Page} from 'ui/page';
import vmModule = require("../../Models/register-product-page-model");

export function pageLoaded(args){

	var page = <Page>args.object;
	var str = page.navigationContext;

	console.log("str////"+str.substr(0,5));
	page.bindingContext = new vmModule.RegisterProductPageModel(str);

}