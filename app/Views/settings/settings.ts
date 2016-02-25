import vmModule = require("../../Models/settings-page-model");
import {Page} from 'ui/page';
import {DropDown} from "nativescript-drop-down";

export function pageLoaded(args) {

    var page = <Page>args.object;
        // dropdown = <DropDown>page.getViewById('dropdown');
    page.bindingContext = new vmModule.SettingsPageModel();

}