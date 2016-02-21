import vmModule = require("../../Models/login-page-model");
import {Page} from 'ui/page';

export function pageLoaded(args) {

    var page = <Page>args.object;
        page.bindingContext = new vmModule.LoginModel();

}
