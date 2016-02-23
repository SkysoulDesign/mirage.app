import observable = require("data/observable");
import vmModule = require("../../Models/sign-in-page-model");
import {Page} from 'ui/page';

export function pageLoaded(args:observable.EventData) {

    var page = <Page>args.object;
        page.bindingContext = new vmModule.SignInPageModel();

}
