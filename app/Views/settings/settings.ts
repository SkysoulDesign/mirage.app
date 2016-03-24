import {SettingsPageModel} from "../../Models/settings-page-model";
import {Page} from 'ui/page';
import {NavigatedData} from "ui/page";

export function pageNavigatedTo(args:NavigatedData) {

    if (args.isBackNavigation)
        return;

    //var page = <Page>args.object;
    //    page.bindingContext = new SettingsPageModel();

    var page = <Page>args.object;

    var model = new SettingsPageModel();

    page.bindingContext = model.init({page: page});

}