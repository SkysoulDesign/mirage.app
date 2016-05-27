import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";
import {SettingsModel} from "./settings-model";

export function loaded(args:NavigatedData) {
    
    var page = <Page>args.object;
        page.bindingContext =  new SettingsModel(page);

}