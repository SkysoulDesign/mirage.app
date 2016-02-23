import observable = require("data/observable");
import vmModule = require("../../Models/sign-in-page-model");
import {Page} from 'ui/page';
import {database} from "../../Modules/Helpers";

export function pageLoaded(args:observable.EventData) {

    var page = <Page>args.object;
        page.bindingContext = new vmModule.SignInPageModel();
        console.dir(database.all());
}
