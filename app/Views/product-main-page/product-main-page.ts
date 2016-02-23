import {Page} from 'ui/page';
import {Mirage as App} from "../../app";
import vmModule = require("../../Models/product-main-page-model");
export function pageLoaded(args){
 	var page = <Page>args.object;
        page.bindingContext = new vmModule.ProductMainPageModel();
}

